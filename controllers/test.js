$(document).ready(function () {
    var MaSoDo=''
    var html='';
    var SoHang=6;
    var SoDo=[];
    function showClass(SoDo){        
        var index=0;    
        SoDo.forEach(function(sl){    
            html+='<div class="cach"></div>';    
            for (let i = 0; i < sl; i++) {
                index++;       
                html+='<div id="day'+index+'" class="col">';
                for (let hang = 0; hang < SoHang; hang++) {
                    html+='<div id="day'+index+'-'+hang+'" class="sv"><div class="msv"></div><div class="name">'+hang+'</div></div>';
                }
                html+='</div>';
            }        
        });
        html+='<div class="cach"></div>'; 
        $('#SDL').html(html);

        $('#SDL div div').click(function (e) { 
            // alert($(e).attr("id"));
            console.log($(this).attr("id"));
            $(this).addClass('red');
        });

        $('#taoSoDo').click(function (e) { 
            $.ajax({
                type: "POST",
                url: "../models/taoSoDo.php",
                data: {MaSoDo:MaSoDo,SoHang:SoHang,Code:html},
                dataType: "html",
                success: function (data) {
                    if(data=='thanh cong')$.toaster({ priority : 'success', title : 'success', message : data});
                    else $.toaster({ priority : 'warning', title : 'warning', message :data});
                    
                },
                erro:function(){
                    $.toaster({ priority : 'danger', title : 'loi', message : 'xay ra loi'});
                },           
            });      
        });
    }
    $('#CauTruc').change(function (e) { 
        var CauTruc=$('#CauTruc').val();
        MaSoDo=CauTruc.replace(/\D+/g, "")
        html='';
        SoDo=Array.from(MaSoDo);
        showClass(SoDo);
    });
    $('#Hang').change(function (e) {         
        SoHang=$('#Hang').val();
        html='';
        showClass(SoDo);
    });
    
    
    
});