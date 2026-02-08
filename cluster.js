const cluster = require("cluster");
const os = require("os");

const numCPUs = process.env.NODE_ENV === 'prod' ? 1 : os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running with Forking ${numCPUs} workers`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.error(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });

} else {
    require("./index.js");
}
