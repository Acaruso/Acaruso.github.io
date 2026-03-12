---
layout: ../../../layouts/Layout.astro
title: RISC-V Assembly
---

# RISC-V Assembly

Most of the xv6 kernel is written in C, but some parts are written in RISC-V assembly. Thus, it's useful to understand the basics of RISC-V assembly in order to understand xv6.

## What Is RISC-V?

RISC-V is an **instruction set architecture (ISA)**.

An ISA defines:

- the CPU's instructions
- the available registers
- how memory is accessed
- how programs interact with the processor

Other examples of instruction set architectures include:

- x86 / x86-64
- ARM
- MIPS

The current version of xv6 runs on the **64-bit RISC-V** ISA.

Since most computers don't have a RISC-V CPU, xv6 is run using **QEMU**, which emulates a RISC-V machine.

---

## Sections

At the highest level, assembly code is organized into **sections**.

Each section corresponds to a part of the final executable.

The most important sections are:

- `.text`
  - executable instructions
- `.data`
  - initialized global variables
- `.bss`
  - uninitialized globals (zeroed at startup)
- `.rodata`
  - read-only constants

If no section is specified, the assembler places instructions into the `.text` section by default.

---

## Labels

A **label** is a symbolic name for a memory address.

Example:

```asm
start:
```

Instead of refering to numeric addresses directly, assembly code can refer to labels.

Control flow instructions like jumps and function calls often target labels.

Labels can also be referenced in C code.

For example:

```asm
call start
```

means "jump to the code located at the label `start`".

---

## Harts (CPUs)

In RISC-V terminology, a **hart** is a hardware thread. You can think of a hart as a CPU core.

Each hart has its own set of registers, including its own program counter, stack pointer, and frame pointer.

Each hart has a unique integer **hart id**, starting from `0`.

The current hart's ID can be read from the register `mhartid`.

---

## Registers

RISC-V has 32 general-purpose registers.

Each register holds a 64-bit value.

Registers have both numeric and conventional names.

Examples:

| Register | Conventional Name | Purpose                                |
| -------- | ----------------- | -------------------------------------- |
| x0       | zero              | always contains 0                      |
| x1       | ra                | return address                         |
| x2       | sp                | stack pointer                          |
| x8       | s0                | frame pointer                          |
| x10      | a0                | first function argument / return value |

Function arguments are typically passed in registers:

```
a0, a1, a2, ...
```

Return values are returned via register `a0`.

---

## Immediate Values

Many instructions contain **immediate values**.

An immediate value is a constant encoded directly in the instruction.

Example:

```asm
addi x6, x5, 10
```

This instruction uses the immediate value `10`. It adds `10` to the value in `x5`.

---

## Basic Arithmetic Instructions

### Add Immediate

Syntax:

```asm
addi <dest>, <source>, <immediate>
```

Example:

```asm
addi x6, x5, 10
```

This is equivalent to:

```
x6 = x5 + 10
```

### Add Immediate Word

Syntax:

```asm
addiw <dest>, <source>, <immediate>
```

This operates on the **lower 32 bits** of the register and sign-extends the result to 64 bits.

### Multiply

Syntax:

```asm
mul <dest>, <src1>, <src2>
```

Example:

```
mul x5, x6, x7
```

---

## Memory Instructions

RISC-V uses **load/store instructions** to access memory.

### Load Doubleword

Syntax:

```asm
ld <dest>, <offset>(<base>)
```

Example:

```asm
ld x5, 16(x10)
```

Conceptually:

```
dest = memory[base + offset]
```

### Store Doubleword

Syntax:

```asm
sd <src>, <offset>(<base>)
```

Conceptually:

```
memory[base + offset] = src
```

## Function Calls

RISC-V uses the instructions `jal` and `jalr` for function calls.

### Jump and Link Register

Syntax:

```asm
jalr <dest>, <offset>(<base>)
```

This instruction:

- jumps to the address `base + offset`
- stores the return address in `dest`

The return address is the instruction immediately following the `jalr`.

### Returning from a Function

The instruction:

```asm
ret
```

is shorthand for:

```asm
jalr x0, 0(ra)
```

which jumps to the return address stored in register `ra`.

---

## Stack Frames

Functions typically allocate space on the stack.

Example:

```asm
addi sp, sp, -16
```

This moves the stack pointer `sp` downward, allocating more space on the stack.

In RISC-V, the stack grows toward lower addresses.

Registers are often saved to the stack at the beginning of a function.

Example:

```asm
sd s0, 8(sp)
```

Later they can be restored:

```asm
ld s0, 8(sp)
```

---

## Example: Compiled C Code

Consider this C function:

```c
int g(int x) {
    return x + 3;
}
```

The RISC-V assembly code could look like this:

```asm
addi sp, sp, -16
sd   s0, 8(sp)
addi s0, sp, 16

addiw a0, a0, 3

ld   s0, 8(sp)
addi sp, sp, 16
ret
```

The middle instruction performs the actual computation:

```
addiw a0, a0, 3
```

Since function arguments are passed in `a0`, this simply adds `3` to the input value.

---

## Example From xv6: `entry.S`

Now that we've covered the basics, we can look at a small piece of xv6 assembly code, `kernel/entry.S`. `kernel/entry.S` contains the first instructions executed by xv6.

You don't need to understand exactly what `kernel/entry.S` is doing right now, the important thing is just to see some examples of the concepts we've discussed so far.

```asm
.section .text
.global _entry
_entry:
    la sp, stack0
    li a0, 1024*4
    csrr a1, mhartid
    addi a1, a1, 1
    mul a0, a0, a1
    add sp, sp, a0
    call start
```

You can see examples of a few things we've discussed so far:

- `.section .text`
  - creates the `.text` section
  - the following instructions will go into the executable's code section
- `.global _entry`
  - makes the `_entry` label globally visible to the linker
  - this is necessary because other parts of xv6 reference this label
- `_entry:`
  - creates the `_entry` label
 - `mul a0, a0, a1`
   - multiplies the values in `a0` and `a1` and stores the result in `a1`

---

## Summary

To start reading xv6's RISC-V assembly code, you mainly need to understand:

- sections
- labels
- registers and calling conventions
- stack operations
- load and store instructions
- function call instructions (`jal`, `jalr`, `ret`)
