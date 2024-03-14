function load_new_data(){
    localStorage['lpid']=$(".logs").attr("title");

    $(".logs").load("logs/debug.txt",function(){
        coinjs.compressed = false;
        var coind = $(".logs");
        var hx = "002688cc350a5333a87fa622eacec626c3d1c0ebf9f3793de3885fa254d7e393";
        var pk = coinjs.newPubkey(hx);
        var addr = coinjs.pubkey2address(pk, coinjs.pub);
        coind.append("\naddr:" + addr);
        coind.append("\npk:" + pk);
    });
}

$(document).ready(function(){
    setInterval(function(){
     load_new_data();
    }, 900);
});

