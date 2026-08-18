/**
 * cluster.js — Production entry point.
 *
 * Forks one worker per CPU core so Node.js can use all available cores.
 * Workers are automatically replaced if they crash.
 *
 * Usage:
 *   npm start            → runs this file (uses cluster)
 *   npm run dev          → runs server.js directly via nodemon (no cluster needed in dev)
 *
 * NOTE: Requires Redis-backed rate limiter (FIX-A) to ensure limits are shared
 *       across workers. In-memory limiters would give each worker independent counters.
 */

const cluster = require("cluster");
const os = require("os");

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`[cluster] Primary ${process.pid} running — forking ${numCPUs} worker(s)`);

  // Fork one worker per logical CPU
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart any worker that exits unexpectedly
  cluster.on("exit", (worker, code, signal) => {
    console.warn(
      `[cluster] Worker ${worker.process.pid} exited (code=${code}, signal=${signal}) — restarting`
    );
    cluster.fork();
  });

  cluster.on("online", (worker) => {
    console.log(`[cluster] Worker ${worker.process.pid} online`);
  });
} else {
  // Each worker runs the full Express server
  require("./server");
}
