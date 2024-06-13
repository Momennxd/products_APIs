import * as Glob from "../productsGlob.ts"; 


export const txtFile = await Deno.readTextFile("./products.json")
export let jsonFile = JSON.parse(txtFile)


export async function HandlePostRequest(req: Request)
{

    const PostPattern = new URLPattern({pathname: "/products"})
    const NewProduct:Glob.product = await req.json();

    if (!ValidateNewProduct(NewProduct))
    {
        return new Response("fields are not valid", {status: 400})
    }


    if (PostPattern.test(req.url))
    {
        NewProduct.id = GetNewID();
        jsonFile = [...jsonFile, NewProduct];

        await Deno.writeTextFile("./products.json", JSON.stringify(jsonFile))
        return new Response(JSON.stringify(NewProduct), {status: 201})

    }


    return new Response(null, {status: 404})

}


function ValidateNewProduct(product: Glob.product)
{


    if (!product.name || product.InStock == undefined)
    {
        console.log(product)
        return false;
    }

    return true;
}


function GetNewID()
{

    let maxID = 0;
    for (const obj of jsonFile)
    {
        if (obj.id > maxID)
        {
            maxID = obj.id;
        }
    }

    return maxID+ 1
}