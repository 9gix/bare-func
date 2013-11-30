require(['list'], function(List){
    describe("An Ordered Pair", function(){
        var wh = List.pair("weight", "height");

        it("contains two elements", function(){
            expect(wh).toContain("weight");
            expect(wh).toContain("height");
        });
    });

});
