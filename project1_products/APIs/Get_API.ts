import * as Glob from "../productsGlob.ts"


export const txtFile = await Deno.readTextFile("./products.json")
export const jsonFile = JSON.parse(txtFile)

export async function HandleGetRequest(req: Request)
{

    const getAllPattern = new URLPattern({pathname: "/products/all"})
    const getOnePattern = new URLPattern({pathname: "/products/:id"})


    if (getAllPattern.test(req.url))
    {
        return new Response(txtFile, {status: 200})
    }
    else if (getOnePattern.test(req.url))
    {
        const matches = getOnePattern.exec(new URL(req.url))
        const ProductID = Number(matches?.pathname.groups.id);

        const SearchedProduct = jsonFile.filter((product: Glob.product) => product.id == ProductID)

        return new Response(JSON.stringify(SearchedProduct), {status: 200})

    }



    return new Response(null, {status: 404})

}