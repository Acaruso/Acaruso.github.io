---
layout: ../../../layouts/Layout.astro
title: xv6 Compilation, Linking, and Loading
---

# xv6 Compilation, Linking, and Loading

In order to understand some of the more low level details of xv6, it's useful to understand how the xv6 source code is compiled into the executable kernel that actually runs inside QEMU.

## Preprocessing

Before compilation begins, the preprocessor runs, and executes any macros defined in the code.

The `#include` macro is very important to understand.

Let's consider an example. Let's say we have a file `foo.c` which contains the definition of a function `myfunction`. Let's say we also have a header file, `foo.h` which contains the function declaration, i.e. the function signature. If we want to call `myfunction` in some other file, `bar.c`, we need to `#include "foo.h"` in `bar.c`. But why?

When we `#include "foo.h"` in `bar.c`, this causes the preprocessor to copy-paste the contents of `foo.h` into `bar.c`.

This is necessary because at compilation time, each `.c` file is compiled seperately. Before compiling the file, the compiler **typechecks** it, i.e. it checks that all functions are being called with the correct types. The compiler needs access to the declarations of all functions used within the file in order to typecheck it.

## Compiling Source Files Into Object Files

At compilation time, the compiler typechecks each source file, and if that succeeds, the compiler **compiles** each source file into an object file (`.o`).

The object file contains various **sections**:
- `.text` — contains machine code
  - this is the compiled code corresponding to the source code in the source file
- `.data` — contains initialized data
- `.bss` — contains zero-initialized data

Note that any addresses used in these sections are not final, they’re relative to the start of the section. These addresses will eventually need to be updated, at link time (explained more below).

The object file also contains a **symbol table**. This is a table of all the **symbols** (functions and variable names) that are used in the file.

Each entry in the symbol table has various fields:
- **status**, which can be one of three options:
  - **defined (global)**
    - the symbol is defined in this file, and is available globally, i.e. it is available to other files
      - examples:
          - functions defined without `static`
          - variables defined at file scope without `static`
  - **defined (local)**
    - the symbol is defined in this file, and is only available within this file
    - examples:
      - functions defined with `static`
      - variables defined at file scope with `static`
      - local labels in assembly (i.e. labels without `.globl`)
  - **undefined**
    - the symbol is not defined in this file
- **address**
  - this is not the final address, it’s relative to the start of the section that the address is in

The object file also contains a **relocation table**. The relocation table contains an entry for every address that will eventually need to be updated at link time.

---

## Linking

After all the source files have been compiled into object files, the linker "links" them (i.e. combines them) into a single file. This file is the final executable program.

The linker also performs relocation -- this is where it fixes up the various addresses used throughout the program so that they refer to the correct locations in the final executable file.

The linker builds a final symbol table by merging all of the `.o` files’ symbol tables together. In this final symbol table, each symbol’s address corresponds to its final address in the executable.

Then the linker uses the relocation table of each `.o` file along with the final symbol table to “fix up” all the addresses in the final executable

---

## The Final Executable

The result of the linking process is a file in the **ELF format** (Executable and Linkable Format).

Importantly, this executable is still just a file on disk.

Before a program can run, it must be loaded into memory, and the CPU must be told to begin executing it.

---

## Starting xv6

When we run `make xv6` to start up xv6, the following sequence occurs:

- the compiler compiles the xv6 source code into an executable file
- we start up QEMU, which begins emulating a virtual RISC-V machine
- the bootloader begins running within the emulated machine
- the bootloader loads the xv6 kernel ELF file into the emulated machine's memory
- execution jumps to the kernel's entry point
- the kernel begins executing
