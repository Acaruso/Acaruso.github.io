---
layout: ../../../layouts/Layout.astro
title: xv6 Compilation, Linking, and Loading
---

# xv6 Compilation, Linking, and Loading

In order to understand some of the more low level details of xv6, it's useful to understand how the xv6 source code is compiled into the executable kernel that actually runs inside QEMU.

## Compiling Source Files Into Object Files

The xv6 repository contains two kinds of source files:

- C source code files (`.c` files)
- assembly source code files (`.S` files)

These file contain human-readable source code that must be converted into binary instructions before a CPU can execute them.

C source files are processed by the compiler. The compiler converts each C file into an object file (`.o`).

Assembly source files are processed by the assembler, which converts each assembly file into an object file.

An object file contains binary executable code.

Each source file is compiled into its own object file. For example:

```
kernel/main.c   → kernel/main.o
kernel/entry.S  → kernel/entry.o
kernel/proc.c   → kernel/proc.o
```

---

## Linking

After all the source files have been compiled into object files, the **linker** "links" them (i.e. combines them) into a single file. This is the final executable program.

The linker also **resolves symbol references** between files.

An object file may reference various functions and variables which are defined in other object files. These functions and variables are also called **symbols**.

When each individual object file is compiled, the compiler uses placeholders for the addresses of these symbols. This is because, since these symbols are located in other files, the compiler doesn't know what their final address will be.

Then at link time, the linker combines all the object files into one file. At this point, the linker "fixes up" all references to these symbols to use their actual addresses in this final executable file.

---

## The Final Executable

The result of the linking process is a file in the **ELF format** (Executable and Linkable Format).

An ELF file contains:

- machine code
- data sections
- symbol tables
- information about the program's memory layout

Importantly, this executable is still just a file on disk.

Before a program can run, it must be:

- loaded into memory
- executed by a CPU

---

## Loading the Kernel

When we run `make xv6` to start up xv6, the following sequence occurs:

- the compiler compiles the xv6 source code into an executable file
- we start up QEMU, which begins emulating a virtual RISC-V machine
- the bootloader begins running within the emulated machine
- the bootloader loads the xv6 kernel ELF file into the emulated machine's memory
- execution jumps to the kernel's entry point
- the kernel begins executing
