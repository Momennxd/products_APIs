
export interface product{

    id:number;
    name:string;
    InStock:boolean;
}


export function DoesProductExist(id:number, jsonFile:any)
{
    for(const obj of jsonFile)
    {
        if (obj.id == id)
        {
            return true;
        }
    }

    return false;
}

