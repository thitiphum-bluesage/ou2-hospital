export const startPersonalInfo = {
    IDCard: '',
    NameTitle: '',
    FirstName: '',
    LastName: '',
    NickName: '',
    DateOfBirth: new Date(),
    Gender: '',
    GroupOfPeople: '',
    Nationality: '',
    Ethnicity: '',
    PersonPicture: null
}

export const startAddress = {
    Province: '',
    District: '',
    Subdistrict: '',
    Village: '',
    HouseNumber: '',
    Road: '',
    Alley: ''
}

export const startBehavior = {
    OffenseType: '',
    DateOfOffense: new Date(),
    Action: ''
}

export const startRecordDetails = {
    SourceOfInformation: '',
    ConfirmInformation: false,
    Status: '',
    DateAdded: new Date(),
    DateOfLastRevision: new Date()
}

export const startToFire = {
    personalInfo:{
        IDCard: '',
        NameTitle: '',
        FirstName: '',
        LastName: '',
        NickName: '',
        DateOfBirth: new Date(),
        Gender: '',
        GroupOfPeople: '',
        Nationality: '',
        Ethnicity: '',
        PersonPicture: null
    },
    civilRegistrationAddress:{
        Province: '',
        District: '',
        Subdistrict: '',
        Village: '',
        HouseNumber: '',
        Road: '',
        Alley: ''
    },
    currentAddress:{
        Province: '',
        District: '',
        Subdistrict: '',
        Village: '',
        HouseNumber: '',
        Road: '',
        Alley: ''
    },
    behavior:{
        OffenseType: '',
        DateOfOffense: new Date(),
        Action: '',
        SourceOfInformation: '',
        ConfirmInformation: false,
        Status: '',
        DateAdded: new Date(),
        DateOfLastRevision: new Date()
    },
    recordDetails:{
        SourceOfInformation: '',
        ConfirmInformation: false,
        Status: '',
        DateAdded: new Date(),
        DateOfLastRevision: new Date()
    }
}
