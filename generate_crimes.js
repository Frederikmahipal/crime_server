const faker = require('faker');

const crimeTypes = [
    { type: 'Theft', category: 'Property Crime', severity: 5 },
    { type: 'Assault', category: 'Violent Crime', severity: 7 },
    { type: 'Murder', category: 'Violent Crime', severity: 10 },
    { type: 'Fraud', category: 'White Collar Crime', severity: 4 },
    { type: 'Burglary', category: 'Property Crime', severity: 6 },
    { type: 'Arson', category: 'Property Crime', severity: 7 },
    { type: 'Kidnapping', category: 'Violent Crime', severity: 9 },
    { type: 'Vandalism', category: 'Property Crime', severity: 4 },
    { type: 'Drug Abuse', category: 'Substance Abuse', severity: 6 },
    { type: 'Embezzlement', category: 'White Collar Crime', severity: 5 },
    { type: 'Domestic Violence', category: 'Violent Crime', severity: 8 },
    { type: 'Trespassing', category: 'Property Crime', severity: 3 },
    { type: 'Stalking', category: 'Violent Crime', severity: 6 },
    { type: 'Forgery', category: 'White Collar Crime', severity: 5 },
    { type: 'Perjury', category: 'White Collar Crime', severity: 6 },
    { type: 'Tax Evasion', category: 'White Collar Crime', severity: 7 },
    { type: 'Money Laundering', category: 'White Collar Crime', severity: 8 },
    { type: 'Cybercrime', category: 'White Collar Crime', severity: 7 },
    { type: 'Identity Theft', category: 'White Collar Crime', severity: 6 },
    { type: 'Sexual Assault', category: 'Violent Crime', severity: 9 },
];

function generateSuspect() {
    return {
        "id": faker.datatype.uuid(), 
        "cpr": faker.datatype.number({ min: 100, max: 999 }),
        "name": faker.name.findName(),

        "last_seen_at": faker.address.streetAddress()
    };
}

const suspectPool = [];
for (let i = 0; i < 50; i++) {
    suspectPool.push(generateSuspect());
}

function generateCrimeScene() {
    return {
        "location": faker.address.streetAddress(),
        "description": faker.lorem.sentence(),
        "foundEvidence": faker.datatype.boolean()
    };
}

function generateCrime() {
    const crimeType = faker.random.arrayElement(crimeTypes);
    const numSuspects = faker.datatype.number({ min: 1, max: 3 });

    const suspects = [];
    for (let i = 0; i < numSuspects; i++) {
        if (suspectPool.length > 0) {
            const suspectIndex = faker.datatype.number({ min: 0, max: suspectPool.length - 1 });
            const suspect = suspectPool[suspectIndex];
            suspects.push(suspect);            
        } else {
            const newSuspect = generateSuspect();
            suspects.push(newSuspect);
            suspectPool.push(newSuspect); 
        }
    }

    const crimeScene = generateCrimeScene();

    return {
        "id": faker.datatype.uuid(),
        "lat": faker.datatype.float({ min: 24.396308, max: 49.384358 }), 
        "lon": faker.datatype.float({ min: -125.000000, max: -66.934570 }), 
        "severity": crimeType.severity,
        "type": crimeType.type,
        "category": crimeType.category,
        "description": faker.lorem.sentence(),
        "suspects": suspects,
        "crimeScene": crimeScene,
        "reported_at": faker.date.recent().toISOString()
    };
}


module.exports = generateCrime;
