const person = {
    name: 'Karna',
    address: {
        line1: 'Baker Street',
        city: 'London',
        country: 'UK',
    },
    profiles: ['twitter', 'linkedin', 'instagram'],
    printProfile: () => {
        person.profiles.map(
            profile => console.log(profile)

        )
    }
}

export default function LearningJavascript(){
    return(
        <div>
            <div>{person.name}</div>
            <div>{person.address.line1}</div> 
            <div>{person.printProfile()}</div>
        </div>
    )
}