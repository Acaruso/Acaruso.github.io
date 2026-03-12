---
layout: ../../../layouts/Layout.astro
title: Getting Started With xv6
---

- xv6 is a teaching/learning OS developed at MIT, which is inspired by Unix

- i assume you're using Linux
  - i assume you have access to `apt`. if not, you will need to use some other package manager to install dependencies

- install dependencies:
    - `sudo apt update`
    - `sudo apt-get install git build-essential gdb-multiarch qemu-system-misc gcc-riscv64-linux-gnu binutils-riscv64-linux-gnu`
    - for this class we use the RISC-V (”risk five”) ISA (instruction set)
        - RISC-V is an open source instruction set
        - other examples of instruction sets: MIPS, ARM, x86, x86-64
        - we use the `qemu` emulator to emulate a RISC-V computer
        - `qemu-system-misc` installs `qemu` with “misc” architectures, including RISC-V

- RISC-V stuff:
    - xv6 runs on a multi-core RISC-V processor
    - RISV-V is 64-bit
    - xv6 is written in “LP64 C”
        - long pointers in C are 64 bits
        - `int`s are 32 bits
    - we use QEMU to emulate the RISC-V CPU
    - QEMU also emulates various other pieces of hardware:
        - ROM containing boot code
        - RAM
        - serial connection to keyboard and screen
        - hard disk
    - to learn more about RISC-V assembly, see “The RISC-V Reader: An Open Architecture Atlas”

- clone the lab source code:
    - `git clone git://g.csail.mit.edu/xv6-labs-2023`
- build and run xv6:
    - `cd xv6-labs-2023`
    - `make qemu`
    - this builds xv6, starts qemu, and runs the xv6 OS inside of qemu. it also runs the xv6 shell and gives you access to it
    - you should be inside the xv6 shell now
    - you should see a prompt like `$`
    - can do `ls` to see various stuff
    - can do `Ctrl-p` to see all currently running processes
    - to exit: `Ctrl-a x`

- each branch of the repo corresponds to a lab.
