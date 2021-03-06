<script runat="server">
Platform.Load("core","1.1");  
try{
  
var filter = {
  Property: "SendDate", 
  SimpleOperator: "between", 
  Value: ["2021-01-01T00:00:00.000Z", "2021-02-01T00:00:00.000Z"]
};  
  
var fields = [
      { "Name" : "ID", "FieldType" : "Number"},
      { "Name" : "SendDate", "FieldType" : "Date", "Ordinal" : 2 },
      { "Name" : "CreatedDate", "FieldType" : "Date", "Ordinal" : 2 },
      { "Name" : "EmailName", "FieldType" : "Text"},
      { "Name" : "FromAddress", "FieldType" : "Text"},
      { "Name" : "PreviewURL", "FieldType" : "Text"},
      { "Name" : "Subject", "FieldType" : "Text"},
      { "Name" : "NumberDelivered", "FieldType" : "Number"}
    ]
  
var SendDE = {
    "CustomerKey" : "send_data_de",
    "Name" : "send_data_de",
    "CategoryID" : 930693,
    "Fields" : fields
 };
 
var deObj = {
        "CustomerKey" : "send_data_de",
        "Name" : "send_data_de",
        "CategoryID" : 930693,
        "Fields" : [
      { "Name" : "ID", "FieldType" : "Number"},
      { "Name" : "SendDate", "FieldType" : "Date", "Ordinal" : 2 },
      { "Name" : "CreatedDate", "FieldType" : "Date", "Ordinal" : 2 },
      { "Name" : "EmailName", "FieldType" : "Text"},
      { "Name" : "FromAddress", "FieldType" : "Text"},
      { "Name" : "PreviewURL", "FieldType" : "Text"},
      { "Name" : "Subject", "FieldType" : "Text"},
      { "Name" : "NumberDelivered", "FieldType" : "Number"}
        ]
    };

var myDE = DataExtension.Add(deObj);

var cols = ["ID","SendDate","CreatedDate","EmailName","FromAddress","PreviewURL","Subject","NumberDelivered" ]; 
  
var logSendData = DataExtension.Init("send_data_de");
  
var prox = new Script.Util.WSProxy(),
    objectType = "Send",
    moreData = true,
    reqID = null,
    numItems = 0;

while(moreData) {
    moreData = false;
    var data = reqID == null ?
           prox.retrieve(objectType, cols, filter):
           prox.getNextBatch(objectType, reqID);

    if(data != null) {
        moreData = data.HasMoreRows;
        reqID = data.RequestID;
        if(data && data.Results) {
            for(var i=0; i< data.Results.length; i++) {
                   logSendData.Rows.Add({
                    ID: data.Results[i].ID,
                    SendDate: data.Results[i].SendDate,
                    CreatedDate: data.Results[i].CreatedDate,
                    EmailName: data.Results[i].EmailName,
                    FromAddress: data.Results[i].FromAddress,
                   PreviewURL: data.Results[i].PreviewURL,
                   Subject: data.Results[i].Subject,
                   NumberDelivered: data.Results[i].NumberDelivered
                  });
                numItems++;
            }
        }
    }
}
Platform.Response.Write("<br>Inserted " + numItems + " records<br>")
}catch(e){
  Write(Stringify(e));
}
</script>
