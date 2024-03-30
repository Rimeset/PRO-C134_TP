$(document).ready(function(){

    console.log('Ready')

    //  Fetch the current date and update it in the DOM
    date_time=new Date()
    current_date=date_time.toLocaleDateString()
    $('#date').text('date : '+current_date)
    //  write an event, when Submit button is clicked
    $('#predict_button').click(function(){
        //  get the text value from the textarea using the 'val()' method
        let text_value = $('#text').val()
        //  Convert it to JS object.
        //  Provide a 'key' here and in write the same in app.py file as well to extract data
        let input_text = {'#text' : text_value}
        console.log(input_text)
        //  ajax request
        $.ajax({
            //  type of web request
            type : 'POST',
            url : '/static/assets/dataset/updated_product_dataset.csv',
            //  Data to be sent in JSON format
            data : JSON.stringify(input_text),
            //  type of resonse expected is json
            dataType : 'json',
            //  contentType
            contentType : 'application/json',
            //  if everything is successful, run this function
            success : function(result){
                // extract prediction and emoticon url from result
                prediction = result.data.predicted_emotion
                $("#prediction").html(result.data.prediction)
                $("#emo_img_url").attr('src', result.data.prediction_img_url);
                $('#prediction').css("display", "");
                $('#emo_img_url').css("display", "");
                $('#save_button').prop('disabled', false);
            },
            // if any error, run this function
            error : function(result){
                console.log(result)
            }
        })
        //  clearing the textbox after every button push
        $('#text').val("")
    })
        
})