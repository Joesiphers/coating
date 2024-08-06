export async function GET(){
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    console.log ("API route", searchParams)
    const res= {await : "fetch"}
    return  Response.json(res)
}