import { promises as dns } from 'dns';
import path from 'path';
import fs from 'fs';

export const scanController = async(req, res)=>{
    const {subdomain, domain} = req.body;

    const fqdn = `${subdomain}.${domain}`;

    try {
        const addresses = await dns.resolve4(fqdn);
    res.json({found: true, fqdn, addresses});
    } catch (error) {
        res.json({found: false});
    }

    
}
