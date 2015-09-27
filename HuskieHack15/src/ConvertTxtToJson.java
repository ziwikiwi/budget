import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.*;

public class ConvertTxtToJson 
{
	public static JSONArray convert(String input) throws FileNotFoundException
	{
		 FileInputStream fstream = new FileInputStream(input);
		 DataInputStream in = new DataInputStream(fstream);
         BufferedReader br = new BufferedReader(new InputStreamReader(in));
         
         /*
         //For JS readin
        
		 JSONObject result= new JSONObject();
		 JSONObject subresults = new JSONObject();
		       
         String strLine;
         try
         {
        	 while ((strLine = br.readLine()) != null)   
        	 {
        		 if (strLine.equals(strLine.toUpperCase()))
        		 {
        			 String[] tokens = strLine.split(":");
        			 result.put(tokens[0], subresults);
        			 
        			 subresults= new JSONObject();
        		 }
        		 else
        		 {
        			 String[] subTokens = strLine.split(":");
        			 subresults.put(subTokens[0], subTokens[1]);
        			 System.out.println("Successful subadd.");
        		 }
        	 }
         }
	
         catch (JSONException j) {System.out.println("Error in conversion - JSON");}
         catch (IOException i) {System.out.println("Error in conversion - IO");}
     
         return result;
         */
         
         //For MongoDB read-in
         JSONArray result = new JSONArray();
         JSONObject category = new JSONObject(); //Overarching JSON object for the subcategory
         JSONObject subcategory = new JSONObject();
         
         String strLine;
         int count = 0;
         
         try
         {
        	 while ((strLine = br.readLine()) != null)   
        	 {
        		 if (strLine.equals(strLine.toUpperCase()))
        		 {
        			 String[] tokens= strLine.split(":");
        			 category.put("Category", tokens[0]);
        			 category.put("Amount", tokens[1]);
        			 
        			 result.put(category);
        			 
        			 category = new JSONObject();
        			 count = 0;
        		 }
        		 else
        		 {
        			 String[] subTokens = strLine.split(":");
        			 subcategory = new JSONObject();
        			 
        			 subcategory.put("Subcat Name", subTokens[0]);
        			 subcategory.put("Subcat Amount", subTokens[1]);
        			 
        			 category.put("Subcategory"  + count, subcategory);		
        			 count++;
        		 }
        	 }
         }
         catch (JSONException j) {System.out.println("Error in conversion - JSON");}
         catch (IOException i) {System.out.println("Error in conversion - IO");}
         
         System.out.println(result);
         return result;
    }
	
	public static void writeJSON(JSONArray obj, String fileName)
	{
		try
		{
			FileWriter writes = new FileWriter(fileName);
			System.out.println(obj);
			writes.write(obj.toString());
			writes.flush();
		}
		catch (IOException i) {System.out.println("error in write!");}
	}


	public static void main(String[] args) throws FileNotFoundException
	{
		
		// JSONObject revenues = convert("Revenues - Dekalb 2015.txt");
		// JSONObject expenses = convert("Expenses - Dekalb 2015.txt");
		
		JSONArray revenues = convert("Revenues - Dekalb 2015.txt");
		JSONArray expenses = convert("Expenses - Dekalb 2015.txt");	

		writeJSON(revenues, "revenuesDB.json");
		writeJSON(expenses, "expensesDB.json");
	}
}

