export interface IPersonalInfo  {
    IDCard:string;
    NameTitle: string;
    FirstName: string;
    LastName: string;
    NickName: string;
    DateOfBirth: Date;
    Gender: string;
    GroupOfPeople: string;
    Nationality: string;
    Ethnicity: string;
    PersonPicture: string ;
}

export interface IAddress {
    Province: string;
    District: string;
    Subdistrict: string;
    Village: string;
    HouseNumber: string;
    Road: string;
    Alley: string;
}

export interface IBehavior {
    OffenseType: string;
    DateOfOffense: Date;
    Action: string;
}

export interface IRecordDetails {
    SourceOfInformation: string;
    ConfirmInformation: boolean;
    Status: string;
    DateAdded: Date;
    DateOfLastRevision: Date;
}

export interface IToFire {
    personalInfo:{
        IDCard:string;
        NameTitle: string;
        FirstName: string;
        LastName: string;
        NickName: string;
        DateOfBirth: Date;
        Gender: string;
        GroupOfPeople: string;
        Nationality: string;
        Ethnicity: string;
        PersonPicture: string ;
    },
    civilRegistrationAddress:{
        Province: string;
        District: string;
        Subdistrict: string;
        Village: string;
        HouseNumber: string;
        Road: string;
        Alley: string;
    },
    currentAddress:{
        Province: string;
        District: string;
        Subdistrict: string;
        Village: string;
        HouseNumber: string;
        Road: string;
        Alley: string;
    }
    behavior:{
        OffenseType: string;
        DateOfOffense: Date;
        Action: string;
    }
    recordDetails:{
        SourceOfInformation: string;
        ConfirmInformation: boolean;
        Status: string;
        DateAdded: Date;
        DateOfLastRevision: Date;
    }
}