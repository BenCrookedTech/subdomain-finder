async function startScanning() {
    const domain = document.getElementById('domainInput').value;
    const display = document.getElementById('displaySubdomain');
    const CONCURRENCY_LIMIT = 50; 

    const response = await fetch('/Subdomain.txt');
    const text = await response.text();
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);

    display.textContent = `Scanning...\n`;

    
    const processSubdomain = async (subdomain) => {
        try {
            const res = await fetch('/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subdomain, domain })
            });
            const data = await res.json();
            if (data.found) {
                display.textContent += `${data.fqdn} (${data.addresses.join(', ')})\n`;
                
                display.scrollTop = display.scrollHeight;
            }
        } catch (err) {
            console.error("Scan error:", err);
        }
    };

  
    for (let i = 0; i < lines.length; i += CONCURRENCY_LIMIT) {
        const batch = lines.slice(i, i + CONCURRENCY_LIMIT);
        await Promise.all(batch.map(subdomain => processSubdomain(subdomain)));
    }

    display.textContent += "Scan Complete";
}