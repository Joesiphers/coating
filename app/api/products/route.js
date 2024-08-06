export async function GET(request){
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    console.log ("app/API route", searchParams,id)
    const res= {await : "fetch"}
    return  Response.json(res)
}