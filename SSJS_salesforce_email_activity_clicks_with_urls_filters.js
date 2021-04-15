<script runat="server">
Platform.Load("core","1.1");  
try{
  
	var complexFilter = {
        RightOperand: {
         LeftOperand: {
	Property: "URL", 
               SimpleOperator: "equals", 
               Value: "https://www.test.com"
			},
			LogicalOperator: "OR",
			RightOperand: {
	 Property: "URL", 
               SimpleOperator: "equals", 
               Value: "http://www.test2.com"
			}
		}
	};

var fields = [
      { "Name" : "SendID", "FieldType" : "Number"},
      { "Name" : "SubscriberKey", "FieldType" : "Text", "MaxLength" : 50, "IsRequired" : true },
      { "Name" : "EventDate", "FieldType" : "Date", "Ordinal" : 2 },
      { "Name" : "EventType", "FieldType" : "Text", "MaxLength" : 50 },
      { "Name" : "TriggeredSendDefinitionObjectID", "FieldType" : "Text", "MaxLength" : 50 },
      { "Name" : "BatchID", "FieldType" : "Number"},
      { "Name" : "ClientID", "FieldType" : "Number"},
      { "Name" : "URL", "FieldType" : "Text" }
    ]
  
var ClickEventDE = {
    "CustomerKey" : "click_event_de",
    "Name" : "click_event_de",
    "CategoryID": 1205831,
    "Fields" : fields
 };
  
var ClickDE = DataExtension.Add(ClickEventDE);

var cols = ["SendID","SubscriberKey","EventDate","EventType","TriggeredSendDefinitionObjectID","BatchID","Client.ID", "URL" ]; 
  
var logClickData = DataExtension.Init("click_event_de");
  
var prox = new Script.Util.WSProxy(),
    objectType = "ClickEvent",
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
                   logClickData.Rows.Add({
                    SendID: data.Results[i].SendID,
                    SubscriberKey: data.Results[i].SubscriberKey,
                    EventDate: data.Results[i].EventDate,
                    EventType: data.Results[i].EventType,
                    TriggeredSendDefinitionObjectID: data.Results[i].TriggeredSendDefinitionObjectID,
                    BatchID: data.Results[i].BatchID,
                    ClientID: data.Results[i].Client.ID,
                    URL: data.Results[i].URL
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
