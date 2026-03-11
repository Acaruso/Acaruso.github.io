---
layout: ../../../layouts/Layout.astro
title: Getting Started With xv6
---

- use Linux
  - i assume you have access to `apt`. if not, you will need to use some other package manager to install dependencies

- install dependencies:
    - `sudo apt update`
    - `sudo apt-get install git build-essential gdb-multiarch qemu-system-misc gcc-riscv64-linux-gnu binutils-riscv64-linux-gnu`

- clone the lab source code:
    - `git clone git://g.csail.mit.edu/xv6-labs-2023`
- build and run xv6:
    - `cd xv6-labs-2023`
    - `make qemu`
    - you should be inside the xv6 shell now
    - you should see a prompt like `$`
    - can do `ls` to see various stuff
    - can do `Ctrl-p` to see all currently running processes
    - to exit: `Ctrl-a x`
