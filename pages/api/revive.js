// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

    if(req.method === "POST"){

        fetch("https://api.replicate.com/v1/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`
            },
            body: JSON.stringify({
                version: "660d922d33153019e8c263a3bba265de882e7f4f70396546b6c9c8f9d47a021a",
                input: {
                    image: "..."
                }
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    res.status(200).json({ name: 'John Doe' })
}
