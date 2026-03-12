- useful notes:
  - lab 4: traps
    - lots of RISC-V assembly notes
  - RISC-V Assembly
    - higher level/more asic
# entry.S Notes

- the goal of this code is to set up a stack for each “hart” (CPU)
- `entry.S` code:

    ```
            # qemu -kernel loads the kernel at 0x80000000
            # and causes each hart (i.e. CPU) to jump there.
            # kernel.ld causes the following code to
            # be placed at 0x80000000.
    .section .text
    .global _entry
    _entry:
            # set up a stack for C.
            # stack0 is declared in start.c,
            # with a 4096-byte stack per CPU.
            # sp = stack0 + ((hartid + 1) * 4096)
            la sp, stack0
            li a0, 1024*4
            csrr a1, mhartid
            addi a1, a1, 1
            mul a0, a0, a1
            add sp, sp, a0
            # jump to start() in start.c
            call start
    ```

- `.section .text`
    - creates the `.text` section
    - the `.text` section contains instructions
- `.global _entry`
    - `.global` is an assembly directive
    - `.global _entry` makes the `_entry` label globally accessible
    - the linker script, `kernel/kernel.ld` has this line: `ENTRY( _entry )`
        - this tells the linker that `_entry` is the entrypoint of the program
- instructions:
    - `la <dest>, <source>`
        - load the address of `source` into `dest`
        - `dest` is a register
        - `source` is a function or label
    - `li <dest>, <source>`
        - load the integer `source` into `dest`
    - `csrr <destination>, <csr>`
        - read the contents of a machine-level “control and status register” into a general-purpose register
        - this is a privileged instruction
    - `addi <dest>, <src>, <imm>`
        - add an immediate (constant) value `imm` to `src` and store the result in `dest`
    - `mul <dest>, <src1>, <src2>`
        - multiply `src1` and `src2`, store the result in `dest`
- code explanation:
    - the main thing that this code does is set up a stack for each hart, by loading the address of the top of the stack into `sp`
        - in RISC-V, the stack grows downwards
    - each hart has its own `sp`
    - the above code runs for each hart
        - the line `ENTRY( _entry )` in `kernel/kernel.ld` tells **all harts** to execute at `_entry` at startup time
    - the stack size for each hart is `4096` bytes
    - at the end, this code calls `start` in `kernel/start.c`
        - `start` also runs for all harts

# RISC-V Assembly

- section
    - a section defines a segment of a program’s memory layout that groups related things together
    - the linker uses sections to organize the final executable or library
    - there are various sections:
        - `.text`
            - contains instructions
        - `.data`
            - contains initialized global and static variables
        - `.bss`
            - contains uninitialized global and static variables
            - these are initialized to `0` at startup time
        - `.rodata`
            - contains read only data like string literals and constants
- label
    - a label is a symbolic name for a memory address
    - labels make it easier to write assembly code because you don’t have to deal with raw addresses
    - control flows like looping and branching are often implemented by jumping to some label
- hart
    - a hart is a “hardware thread” — basically a CPU
    - each hart has a unique hart id, numbered sequentially, starting at `0`
        - for example, if there are four harts, the hart ids will be: `0`, `1`, `2`, `3`
    - each hart has its own stack pointer, `sp`
- load:
    - `ld <dest> <offset>(<base>)`
    - if you think of memory as like a big array of bytes, `m`, this does:
        - `dest = m[base + offset]`
    - note that we’re **not** doing:
        - `dest = base + offset`

# lab 4 Traps

(these are exceprts from my lab notes, relevant to risc-v)

- relevant assembly instructions:
    - `addi <dest>, <source>, <immediate>`
        - add immediate
        - add `immediate` to `source` and store result in `dest`
        - `source` and `dest` are registers
        - `immediate` is a 12-bit immediate signed value
            - an immediate value is a constant value that’s directly encoded within an instruction
        - example: `addi x6, x5, 10`
    - `addiw <dest>, <source>, <immediate>`
        - add immediate word
        - add `immediate` to the lower 32 bits of `source`, sign extend the result to 64 bits, and store in `dest`
    - `sd <src>, <offset>(<base>)`
        - store doubleword
        - store `src` into memory at the address `offset + base`
        - `offset` is a 12-bit immediate signed value
        - `base` is a register
        - example: `sd x5, 16(x10)`
    - `ld <dest>, <offset>(<base>)`
        - load doubleword
        - load `dest` into memory at the address `offset + base`
        - in RISC-V 64 bit, a word is 32 bits, a doubleword is 64 bits, and all general purpose registers are 64 bits
    - `jalr <dest>, <offset>(<base>)`
        - jump and link register
        - jump the `pc` to the location `offset + base`
        - store the return address in `dest`
        - the return address is the address of the instruction immediately following the `jalr` instruction
        - `jalr` is used to make a function call
            - we jump to the address of the function’s code
            - once the function call finishes, we jump back to the instruction immediately following the `jalr` instruction
    - `jalr <offset>(<base>)`
        - this is an abbreviation of `jalr` where `ra` is hardcoded as `dest`
    - `ret`
        - return to the instruction at address `ra`
        - this is an abbreviation of `jalr x0, 0(ra)`
            - `jalr x0, 0(ra)` jumps to the instruction at address `ra`
                - `ra` is the return address register
            - the `x0` register always contains `0`
                - thus, this discards the return address
    - `auipc <dest>, <immediate>`
        - add upper immediate to `pc`
        - `immediate` is the top 20 bits of an address
        - `auipc` shifts `immediate` left by `12` bits, adds it to the current value of `pc`, and stores the result in `dest`
        - `auipc` often used along with `addi`
            - `addi` sets the lower 12 bits of `pc`
        - why do we need to use `auipc` and `addi` to store an address in `pc`?
            - this is necessary when we want to store an **immediate value** into `pc`
            - recall that an immediate value is a constant value that’s directly encoded within an instruction
            - in RISC-V, all instructions are 32 bits long (even though we’re using 64 bit RISC-V)
            - a 32 bit instruction is not big enough to contain a 64 bit address as an immediate value
                - it’s not even big enough to contain a 32 bit instruction as an immediate value, because the instruction needs to contain some other information in addition to the immediate value
            - thus, in order to load a large immediate value like a 32 bit or 64 bit address into `pc`, we need to use multiple instructions
                - one way around this is to load the address from memory rather than from an immediate value
            - side note:
                - often even on 64 bit RISC-V, we only need to load a 32 bit address into `pc`
                - this is because, due to virtual memory, most programs only use fairly low addresses, they don’t use their entire 64 bit address space
- run `make fs.img`. this compiles `user/call.c` and also creates a readable assembly version in `user/call.asm`
- `user/call.c`:

    ```c
    #include "kernel/param.h"
    #include "kernel/types.h"
    #include "kernel/stat.h"
    #include "user/user.h"

    int g(int x) { return x + 3; }

    int f(int x) { return g(x); }

    void main(void) {
        printf("%d %d\n", f(8) + 1, 13);
        exit(0);
    }
    ```

- examine `user/call.c` and `user/call.asm`
- examine the assembly code for the functions `g`, `f`, and `main`, and answer the questions that follow
- `g` function:
    - code:

        ```
        int g(int x) { return x + 3; }
           0:	1141                	addi	sp, sp, -16
           2:	e422                	sd	  s0, 8(sp)
           4:	0800                	addi	s0, sp, 16
           6:	250d                	addiw	a0, a0, 3
           8:	6422                	ld	  s0, 8(sp)
           a:	0141                	addi	sp, sp, 16
           c:	8082                	ret
        ```

    - consider this code:

        ```
           0:	1141                	addi	sp, sp, -16
           2:	e422                	sd	  s0, 8(sp)
           4:	0800                	addi	s0, sp, 16
        ```

        - `s0` is the frame pointer. the frame pointer points to the beginning of the current function’s stack frame
        - `addi sp, sp, -16`
            - decrements `sp` by `16` to allocate space on the stack
        - `sd s0, 8(sp)`
            - stores the current value of `s0` on the stack
                - this value is the frame of the calling function — this is the address of the beginning of the calling function’s stack
            - when the current function finishes executing and returns, `s0` will be restored
            - note that the stack grows downwards, but data is still stored “upwards”
                - i.e., in the example below, the first byte of `s0` is stored at index `92`, the second byte at index `93`, etc.
        - `addi s0, sp, 16`
            - stores the beginning of the current function’s stack into `s0`
        - image:

            ![Untitled Diagram (30).jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/5b9ca010-0a35-4c90-97d9-38a2284277a1/5e937b89-5b4c-465a-9785-2618ad846116/Untitled_Diagram_(30).jpg)

    - `addiw a0, a0, 3`
        - this is the core logic of the function
        - adds `3` to the input argument
        - recall that input arguments are stored in registers `a0`, `a1`, etc.
    - `ld s0, 8(sp)`
        - restores `s0`s original value by loading it from the stack where we saved it earlier
    - `addi sp, sp, 16`
        - unwinds the stack pointer, deallocating all space on the stack
