import * as Glob from "../productsGlob.ts"; 


export const txtFile = await Deno.readTextFile("./products.json")
export let jsonFile = JSON.parse(txtFile)


export async function HandlePatchRequest(req: Request)
{

    const PostPattern = new URLPattern({pathname: "/products/update/:id"})

    if (!PostPattern.test(req.url))
    {
        return new Response(null, {status: 404})
    }

    const matches = PostPattern.exec(new URL(req.url))
    const NewProductID = Number(matches?.pathname.groups.id)

    if (!Glob.DoesProductExist(NewProductID, jsonFile))
    {
        return new Response("ID does not exist in the database", {status: 400})
    }

    const NewProduct:Glob.product = await req.json();

    if (NewProduct.id != undefined)
        return new Response("ID is readonly", {status: 400})


    if (PostPattern.test(req.url))
    {
       //update the object in the json file 
        UpdateProduct(NewProduct, NewProductID);

    
        //saving the file
        await Deno.writeTextFile("./products.json", JSON.stringify(jsonFile))
        return new Response(JSON.stringify(NewProduct), {status: 200})

    }


    return new Response(null, {status: 404})

}





function UpdateProduct(product: Glob.product, id:number)
{
    const arrProductsLength = Array(jsonFile).length

    for(let i =0; i < arrProductsLength; i++)
    {

        if (jsonFile[i].id == id)
        {   

            if (product.name != undefined)
            {
                jsonFile[i].name = product.name;
            }

            if (product.InStock != undefined)
            {
                jsonFile[i].InStock = product.InStock;
            }
            
            break;   
        }
    }




}