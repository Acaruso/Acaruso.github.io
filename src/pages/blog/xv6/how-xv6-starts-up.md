---
layout: ../../../layouts/Layout.astro
title: How xv6 Starts Up
---

# How xv6 Boots and Runs Its First Process

This post walks through what happens when xv6 starts, from the moment the machine boots to the point where the first user process begins executing.

The path we will follow is:

```
boot loader
    ↓
kernel/entry.S
    ↓
kernel/start.c
    ↓
kernel/main.c
    ↓
kernel/proc.c:userinit
    ↓
kernel/proc.c:scheduler
    ↓
user/initcode.S
    ↓
exec
    ↓
user/init.c
    ↓
sh (the shell)
```

---

# Booting the Machine

When a RISC-V machine starts, it first runs a **boot loader** stored in ROM.

At this stage:

* paging is disabled
* virtual addresses map directly to physical addresses

The boot loader loads the xv6 kernel into memory at:

```
0x80000000
```

The lower address range:

```
0x0 – 0x80000000
```

is reserved for **memory-mapped I/O devices**.

Once the kernel is loaded, the CPUs jump to the kernel entry point.

---

# Entering the Kernel: `entry.S`

Execution begins in:

```
kernel/entry.S
```

specifically at the `_entry` label.

All **harts (CPUs)** begin executing here in **machine mode**.

The linker script (`kernel/kernel.ld`) specifies this entry point:

```
ENTRY(_entry)
```

The purpose of `_entry` is simple:

> set up a stack for each CPU so that xv6 can run C code.

---

# Stack Setup in `entry.S`

Each CPU needs its own stack.

xv6 allocates stacks using a global array defined in `kernel/start.c`:

```
stack0
```

Each stack is **4096 bytes**.

The assembly code computes the stack pointer for the current CPU.

```
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

The key idea is the calculation:

```
sp = stack0 + ((hartid + 1) * 4096)
```

This selects a different stack for each hart.

### Stack layout

Conceptually the stacks look like this:

```
stack0

+-------------+
| hart 3 stack|
+-------------+
| hart 2 stack|
+-------------+
| hart 1 stack|
+-------------+
| hart 0 stack|
+-------------+
```

In RISC-V, stacks grow **downward**, so the stack pointer starts at the top.

Once the stack is set up, `_entry` calls:

```
start()
```

in `kernel/start.c`.

---

# Machine-Mode Initialization: `start.c`

The function `start()` runs on **every hart**.

At this stage the CPU is still in **machine mode**, which allows configuration of privileged hardware features.

One of the first steps is storing the current hart ID in register `tp`.

```
int id = r_mhartid();
w_tp(id);
```

This allows the kernel to later determine which CPU is running.

The helper functions `r_mhartid` and `w_tp` are defined in:

```
kernel/riscv.h
```

They provide wrappers for reading and writing CPU registers.

---

# Switching to Supervisor Mode

The xv6 kernel normally runs in **supervisor mode**, not machine mode.

To switch modes, `start()` executes the instruction:

```
mret
```

Normally `mret` returns from a trap back to supervisor mode.

However, at boot time there was no trap, so xv6 manually prepares the CPU state so that `mret` behaves like a return.

Before calling `mret`, the kernel:

* sets the previous privilege mode to **supervisor** in `mstatus`
* sets the return address (`mepc`) to `main`
* disables paging by writing `0` to `satp`
* delegates interrupts and exceptions to supervisor mode
* configures the timer interrupt

After this setup, executing `mret` causes the CPU to jump to:

```
kernel/main.c : main()
```

---

# Kernel Initialization: `main()`

The `main()` function performs general kernel initialization.

It:

* initializes devices
* initializes kernel subsystems

If the current hart ID is **0**, it performs additional startup work.

Specifically, hart 0 calls:

```
userinit()
```

which creates the first user process.

Other harts spin in a loop until initialization is finished:

```
while (started == 0)
```

Once initialization is complete, **all harts enter the scheduler**.

---

# Creating the First Process: `userinit()`

The function `userinit()` creates the first user process.

It:

1. finds an unused slot in the process table
2. initializes a process structure
3. sets the process to run:

```
user/initcode.S
```

Finally it sets:

```
p->state = RUNNABLE
```

Note that the process **does not run immediately**.

It is simply marked runnable.

The scheduler will eventually choose it.

---

# Starting the Scheduler

Each CPU calls:

```
scheduler()
```

The scheduler repeatedly scans the process table looking for runnable processes.

Conceptually:

```
while (1) {
    find RUNNABLE process
    context switch to it
}
```

Because every hart runs the scheduler, multiple CPUs can schedule processes in parallel.

Eventually the scheduler selects the process created by `userinit`.

---

# Running `initcode`

The process created by `userinit()` begins executing:

```
user/initcode.S
```

This tiny program performs a single task: it makes an `exec` system call.

```
load SYS_EXEC into register a7
ecall
```

In xv6 system calls work like this:

```
a7 = syscall number
ecall
```

The system call loads and runs the program:

```
init
```

---

# The `init` Process

The program `user/init.c` performs basic system setup.

It:

1. creates the console device if necessary
2. opens the console device as file descriptors:

```
0  stdin
1  stdout
2  stderr
```

Finally, it starts the shell:

```
exec("sh")
```

---

# The Shell Starts

At this point the system is fully running.

The process tree now contains the shell:

```
sh
```

which reads commands from the console and launches programs.

---

# Summary of the Boot Sequence

The full startup path looks like this:

```
boot loader
    ↓
kernel/entry.S
    ↓
kernel/start.c
    ↓
kernel/main.c
    ↓
kernel/proc.c:userinit
    ↓
kernel/proc.c:scheduler
    ↓
user/initcode.S
    ↓
exec
    ↓
user/init.c
    ↓
sh
```

By the time the shell appears, the kernel has:

* initialized CPUs
* switched privilege modes
* created the first process
* started the scheduler

This process forms the foundation for everything that happens next in xv6.
