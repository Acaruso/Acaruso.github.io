---
layout: ../../../layouts/Layout.astro
title: Getting Started With xv6
---

# Getting Started With xv6

[xv6](https://pdos.csail.mit.edu/6.1810/2023/xv6.html) is a small teaching operating system developed at MIT. It is loosely based on early Unix systems and is designed to make operating system concepts easier to study.

Because the codebase is relatively small and well structured, xv6 is often used in operating systems courses and self-study projects.

This guide shows how to install the required tools, build xv6, and run it inside an emulator.

---

# Prerequisites

These instructions assume you are using **Linux** and have access to the `apt` package manager (Ubuntu, Debian, etc.). If you are using a different distribution, you will need to install equivalent packages using your system’s package manager.

---

# Install Dependencies

First install the tools required to build and run xv6.

```bash
sudo apt update
sudo apt-get install git build-essential gdb-multiarch \
    qemu-system-misc \
    gcc-riscv64-linux-gnu \
    binutils-riscv64-linux-gnu
```

These packages provide:

* **git** – used to clone the xv6 source code
* **build-essential** – includes `gcc`, `make`, and other build tools
* **gdb-multiarch** – a debugger that supports multiple CPU architectures
* **qemu-system-misc** – installs QEMU with support for additional CPU architectures, including RISC-V
* **gcc-riscv64-linux-gnu** and **binutils-riscv64-linux-gnu** – a cross-compiler toolchain for building RISC-V programs

---

# Why RISC-V?

The current version of xv6 runs on the **RISC-V architecture**.

RISC-V is an open instruction set architecture (ISA). Other examples of ISAs include:

* x86 / x86-64
* ARM
* MIPS

xv6 runs on a **64-bit RISC-V processor**, and the kernel is written in **LP64 C**, meaning:

* pointers and `long` values are **64 bits**
* `int` values are **32 bits**

Since most computers do not have a RISC-V CPU, we use an emulator to run xv6.

---

# Running xv6 with QEMU

We use **QEMU** to emulate a RISC-V computer.

QEMU simulates the hardware required to run the operating system, including:

* a RISC-V CPU
* RAM
* ROM containing boot code
* a virtual hard disk
* a serial connection for keyboard and screen

This allows xv6 to run exactly as if it were running on real hardware.

---

# Cloning the xv6 Source Code

Clone the MIT xv6 labs repository:

```bash
git clone git://g.csail.mit.edu/xv6-labs-2023
```

Then `cd` into the directory:

```bash
cd xv6-labs-2023
```

Each branch in the repository corresponds to a different lab assignment used in the MIT operating systems course.

---

# Building and Running xv6

To build and run xv6 inside QEMU:

```bash
make qemu
```

This command:
- compiles the xv6 kernel and user programs
- starts the QEMU emulator
- boots the xv6 operating system

Once the system starts, you should be in the xv6 shell, and you should see the shell prompt, `$`.

---

# Basic xv6 Commands

You can try a few simple commands.

List files:

```bash
ls
```

Show running processes:

```
Ctrl-p
```

This prints the current process table.

---

# Exiting the Emulator

To exit QEMU and return to your host system:

```
Ctrl-a x
```

---

# Further Reading

If you want to learn more about the RISC-V architecture used by xv6, a good reference is:

[The RISC-V Reader](http://www.riscvbook.com/)
