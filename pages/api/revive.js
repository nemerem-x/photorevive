
export default async function handler(req, res) {

    const imageUrl = req.body.imageUrl

    const revived = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + process.env.REPLICATE_API_TOKEN,
        },
        body: JSON.stringify({
            version: "9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
            input: {
                image: imageUrl,
                version: "v1.4",
                scale: 2,
            }
        })
    })


    const data = await revived.json()
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
        console.log(response)

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
