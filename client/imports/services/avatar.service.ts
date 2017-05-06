import { Injectable } from '@angular/core';

@Injectable()
export class AvatarService {

    url: string = 'img/avatars/';

    constructor() {}

    getAvatarsByGender(gender: string): any[] {
        // define avatar list
        let avatarList: any[];
        // gender must be sent
        if (gender && gender.length > 0) {
            // control gender value
            if ('M' === gender) {
                // return male avatars
                avatarList = this.getMaleAvatars();
            } else if ('F' === gender) {
                // return female avatars
                avatarList = this.getFemaleAvatars();
            }
        }
        // return avatar list
        return avatarList;
    }

    getFemaleAvatars(): any[] {
        // get all list
        const avatars: any[] = [
            'FA01','FA02','FA03','FA04','FA05',
            'FB01','FB02','FB03','FB04','FB05',
            'FC01','FC02','FC03','FC04','FC05',
            'FD01','FD02','FD03','FD04','FD05',
            'FE01','FE02','FE03','FE04','FE05',
            'FG01','FG02','FG03','FG04','FG05',
            'FH01','FH02','FH03','FH04','FH05',
            'FI01','FI02','FI03','FI04','FI05'
        ];
        // return aliases
        return avatars;
    }

    getMaleAvatars(): any[] {
        // get all list
        const avatars: any[] = [
            'A01','A02','A03','A04','A05',
            'B01','B02','B03','B04','B05',
            'C01','C02','C03','C04','C05',
            'D01','D02','D03','D04','D05',
            'E01','E02','E03','E04','E05',
            'F01','F02','F03','F04','F05',
            'G01','G02','G03','G04','G05',
            'H01','H02','H03','H04','H05',
            'I01','I02','I03','I04','I05',
            'J01','J02','J03','J04','J05',
            'K01','K02','K03','K04','K05',
            'L01','L02','L03','L04','L05',
            'M01','M02','M03','M04','M05',
            'N01','N02','N03','N04','N05',
            'O01','O02','O03','O04','O05'
        ];
        // return aliases
        return avatars;
    }
}