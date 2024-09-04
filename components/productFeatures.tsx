export default function FeaturesPanel (
    {features,productDesigned,productApplication}:{features:string,productDesigned:string,productApplication:string}
    )
    {
    let featuresArr =[]
        features.split(';').foreach(i=>{
            featuresArr.push(i.split(':'))
        })
    }

