
import * as GET from "./APIs/Get_API.ts"
import * as POST from "./APIs/Post_API.ts"
import * as PUT from "./APIs/Put_API.ts"
import * as PATCH from "./APIs/Patch_API.ts"
import * as DELETE from "./APIs/Delete_API.ts"



async function Handler(req: Request)
{


    if (req.method == "GET")
    {
        return GET.HandleGetRequest(req);
    }
    else if (req.method == "POST")
    {
        return POST.HandlePostRequest(req);
    }
    else if (req.method == "PUT")
    {
        return PUT.HandlePutRequest(req);
    }
    else if (req.method == "PATCH")
    {
        return PATCH.HandlePatchRequest(req);
    }
    else if (req.method == "DELETE")
    {
        return DELETE.HandleDeleteRequest(req);
    }


    return new Response(null, {status: 404})
}


Deno.serve(Handler)