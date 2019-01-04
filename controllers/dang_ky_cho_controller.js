$(document).ready(function () {
    
    var MaSoDo='';
    var html='';
    var SoHang=9;
    var SoDo=[]; 
    var MaLop='';       
    function showClass(){ 
        html='';     
        var index=0;    
        SoDo.forEach(function(sl){    
            html+='<div class="cach"></div>';    
            for (let i = 0; i < sl; i++) {
                index++;       
                html+='<div id="day'+index+'" class="col">';
                for (let hang = 0; hang < SoHang; hang++) {
                    html+='<div id="day'+index+'-'+hang+
                        '" class="sv" ondrop="drop(event)" ondragover="allowDrop(event)"></div>';
                }
                html+='</div>';
            }        
        });
        html+='<div class="cach"></div>'; 
        $('#SDL').html(html);

        // $('#SDL div div').click(function (e) { 
        //     // alert($(e).attr("id"));
        //     console.log($(this).attr("id"));
        //     $(this).addClass('red');
        // }); 
        //drag drop
        
        //nhap ma
        $('#MaSV').change(function (e) { 
            $("#tg .name").html('<p draggable="true" ondragstart="drag(event)" id="drag1"></p>');
            var MaSV=$('#MaSV').val();
            $.ajax({
                type: "GET",
                url: "../models/studen_in_class.php",
                data: {MaSV:MaSV,MaLop:MaLop},
                dataType: "text",
                success: function (response) {
                    var jsonData=JSON.parse(response);
                    console.log(jsonData)
                    $('#tg .msv').html(jsonData['MaSV']);
                    $('#drag1').html(jsonData['Ho']+' '+jsonData['Ten']);
                    document.getElementById("drag1").id = jsonData['MaSV'];
                    
                },
                erro:function(){
                    $.toaster({ priority : 'danger', title : 'loi', message : 'xay ra loi'});
                },
            });            
        });
    
    }

    $('#MaLop').change(function (e) { 
        MaLop=$('#MaLop').val()
        $.ajax({
            type: "GET",
            url: "../models/get_class.php",
            data: {MaLop:MaLop},
            dataType: "text",
            success: function (data) {
                var jsonData=JSON.parse(data);
                console.log (jsonData);
                MaSoDo=jsonData['MaSoDo'];
                SoDo=Array.from(MaSoDo);
                SoHang=jsonData['SoHang'];
                showClass();
            },
            erro:function(){
                $.toaster({ priority : 'danger', title : 'loi', message : 'xay ra loi'});
            },
        });        
    });
    
});