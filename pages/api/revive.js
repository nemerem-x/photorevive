// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

    // if(req.method === "POST"){

    const revived = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + process.env.REPLICATE_API_TOKEN,
        },
        body: JSON.stringify({
            version: "660d922d33153019e8c263a3bba265de882e7f4f70396546b6c9c8f9d47a021a",
            input: {
                image: "..."
            }
        })
    })

    const data = await revived.json()
    console.log(data)
    const url = data.urls.get

    let revivedImage = null
    while (!revivedImage) {

        const finalUrl = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + process.env.REPLICATE_API_TOKEN,
            },
        });

        const response = await finalUrl.json()

        if (response.status === "succeeded") {
            revivedImage = response.output
        } else if (response.status === "failed") {
            break;
        } else {
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }


    res.status(200).json(revivedImage ? revivedImage : "Failed")

}
