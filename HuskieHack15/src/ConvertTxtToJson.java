import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.*;

public class ConvertTxtToJson 
{
	public static JSONObject convert(String input) throws FileNotFoundException
	{
		 FileInputStream fstream = new FileInputStream(input);
		 DataInputStream in = new DataInputStream(fstream);
         BufferedReader br = new BufferedReader(new InputStreamReader(in));
         
		 JSONObject result= new JSONObject();
		 JSONObject totalresult = new JSONObject();
		 JSONObject subresults = new JSONObject();
		 
         String strLine;
         try
         {
        	 while ((strLine = br.readLine()) != null)   
        	 {
        		 if (strLine.equals(strLine.toUpperCase()))
        		 {
        			 String[] tokens = strLine.split(":");
        			 totalresult.put (tokens[1], subresults);
        			 result.put(tokens[0], totalresult);
        			 
        			 totalresult = new JSONObject();
        			 subresults= new JSONObject();
        		 }
        		 else
        		 {
        			 String[] subTokens = strLine.split(":");
        			 subresults.put(subTokens[0], subTokens[1]);
        			 System.out.println("Successful subadd.");
        		 }
        	 }
        		 
        		 /*
        		 if (strLine.contains(":"))
        		 {
        			 String[] tokens = strLine.split(":");
        			 result.put(tokens[0], Integer.parseInt(tokens[1].trim()));
        		 }
        		 */
         }
         catch (JSONException j) {System.out.println("Error in conversion - JSON");}
         catch (IOException i) {System.out.println("Error in conversion - IO");}

         System.out.println(result);
         return result;
    }
	
	public static void writeJSON(JSONObject obj, String fileName)
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
		JSONObject revenues = convert("Revenues - Dekalb 2015.txt");
		JSONObject expenses = convert("Expenses - Dekalb 2015.txt");
		
		writeJSON(revenues, "revenues.json");
		writeJSON(expenses, "expenses.json");
	}
}

