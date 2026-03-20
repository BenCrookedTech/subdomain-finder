import express from "express";
import dotenv from "dotenv";
import router from "./routes.js";


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.static('public'));


app.use("/", router);

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});



// const url = document.getElementById('domainInput');
// const displaySubdomains = document.getElementById('displaySubdomain');
// const concurrentLimit = 30;
// const wordlistPath = "/home/camelcaselover/worldlist.txt";

// async function checkSubdomain(subdomain, domain) {
//     const fqdn = `${subdomain}.${domain}`;
//     try {
//         const addresses = await dns.resolve4(fqdn);
//         return { fqdn, addresses, found: true };
//     } catch (err) {
       
//         return { fqdn, found: false };
//     }
// }

// async function startScanning() {
    
//     if (!fs.existsSync(wordlistPath)) {
//         console.error(`Error: ${wordlistPath} not found.`);
//         return;
//     }

//     const fileStream = fs.createReadStream(wordlistPath);
//     const rl = readline.createInterface({
//         input: fileStream,
//         crlfDelay: Infinity
//     });

//     let activeQueries = [];

//     console.log(`Starting scan for ${url}`);

   
//     for await (const line of rl) {
//         const subdomain = line.trim();
//         if (!subdomain) continue;

//         const query = checkSubdomain(subdomain, url).then(result => {
//             if (result.found) {
//                 displaySubdomains.textContent = `[+]Found: ${result.fqdn} -> ${result.addresses.join(', ')}`;
//                 // console.log(`[+] Found: ${result.fqdn} -> ${result.addresses.join(', ')}`);
//             }
            
//             activeQueries = activeQueries.filter(p => p !== query);
//         });

//         activeQueries.push(query);

//         if (activeQueries.length >= concurrentLimit) {
//             await Promise.race(activeQueries);
//         }
//     }

//     await Promise.all(activeQueries);
//     console.log(`END`);
// }

// startScanning().catch(console.error);
