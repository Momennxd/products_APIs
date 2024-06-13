import * as Glob from "../productsGlob.ts"; 


export const txtFile = await Deno.readTextFile("./products.json")
export let jsonFile = JSON.parse(txtFile)



export async function HandleDeleteRequest(req: Request)
{

    const deletePattern = new URLPattern({pathname: "/products/delete/:id"})

    if (!deletePattern.test(req.url))
    {
        return new Response(null, {status: 404})
    }
    

    const matches = deletePattern.exec(new URL(req.url))
    const DeleteproductID = Number(matches?.pathname.groups.id)


    if (!Glob.DoesProductExist(DeleteproductID, jsonFile))
    {
        return new Response("ID does not exist in the database", {status: 400})
    }

    jsonFile = jsonFile.filter((prod:Glob.product) => prod.id != DeleteproductID)

    //saving the file
    await Deno.writeTextFile("./products.json", JSON.stringify(jsonFile))

    return new Response(JSON.stringify(DeleteproductID), {status: 200})


}