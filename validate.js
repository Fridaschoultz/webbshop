// Formulärvalidering

$(document).ready(function() {
    $("input[required]").keyup(validate);
    function validate () {
      $(this).val().length < 4
        ?
          $(this)
            .siblings(".4-message")
            .show(500)
        : // 4. Dölj meddelandet om fältet innehåller minst 4 tecken
          $(this)
            .siblings(".4-message")
            .hide(500);    
        }
        
    $("input[required]").keyup(phonenumber);
    function phonenumber(){
        
    };
        
}); 