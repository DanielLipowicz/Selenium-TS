describe("Jest framewok should be recognized",()=>{
    it('So all keywords should be available',()=>{
        expect("And matcher should works properly").toBeDefined();
    });
    it('There should be possibility to declare some variable and perform operation on it',()=>{
        let pfm:number;
        pfm = 2 + 2;
        expect(pfm).toEqual(4);
    })
    }
);