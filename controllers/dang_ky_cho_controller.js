$(document).ready(function () {
    $('#MaLop').change(function (e) { 
        console.log($('#MaLop').val())
        $.ajax({
            type: "GET",
            url: "../models/get_class.php",
            data: {MaLop:$('#MaLop').val()},
            dataType: "json",
            success: function (data) {
                console.log(data);
            },
            erro:function(){
                $.toaster({ priority : 'danger', title : 'loi', message : 'xay ra loi'});
            },
        });
        
    });
    
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

        
    }
    
    
});