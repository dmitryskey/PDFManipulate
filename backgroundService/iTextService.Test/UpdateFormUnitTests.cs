using NUnit.Framework;
using Newtonsoft.Json;
using iTextService.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Test
{
    public class UpdateFormUnitTests
    {
        private UpdateFormController controller = new UpdateFormController();

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void TestBlankValue([Values("", "{}", "{'file': ''}", "{'file': 'non-exists.pdf'}")] string val)
        {
            var result = controller.Post(JsonConvert.DeserializeObject<UpdateFormController.Fields>(val)) as BadRequestResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);
        }

        [Test]
        public void TestForm(
            [Values(
            "{'file': 'US I9.pdf'}",
            "{'file': 'US I9.pdf', 'operation': 'f'}",
            @"{'file': 'US I9.pdf', 'operation': 'f', 'entries':
                [{'name': 'FirstName', 'value': 'Test', 'operation': 's'}]}",
            @"{'file': 'US I9.pdf', 'operation': 'f', 'entries':
                [{'name': 'Instructions', 'operation': 'd'}]}",
            @"{'file': 'US I9.pdf', 'operation': 'f', 'entries': [
                {'name': 'FirstName', 'value': 'Test', 'operation': 's'},
                {'name': 'LastName', 'value': 'Person', 'operation': 's'},
                {'name': 'State', 'value': 'FL', 'operation': 's'},
                {'name': 'Citizen', 'value': 'On', 'operation': 's'},
                {'name': 'NonCitizenNational', 'value': 'Off', 'operation': 's'},
                {'name': 'Instructions', 'operation': 'd'}]}",
            @"{'file': 'US I9.pdf', 'operation': 'f', 'entries': [
                {'name': 'LastName', 'value': 'Test', 'operation': 's'},
                {'name': 'FirstName', 'value': 'Person', 'operation': 's'},
                {'name': 'MiddleInitial', 'value': 'N/A', 'operation': 's'},
                {'name': 'OtherNames', 'value': 'N/A', 'operation': 's'},
                {'name': 'Address', 'value': '123 Way', 'operation': 's'},
                {'name': 'ApartmentNumber', 'value': 'N/A', 'operation': 's'},
            	{'name': 'State', 'value': 'AL', 'operation': 's'},
            	{'name': 'City', 'value': 'LA', 'operation': 's'},
            	{'name': 'Zip', 'value': '44434', 'operation': 's'},
            	{'name': 'DateOfBirth', 'value': '02/01/2005', 'operation': 's'},
            	{'name': 'Email', 'value': 'N/A', 'operation': 's'},
            	{'name': 'Phone', 'value': 'N/A', 'operation': 's'},
            	{'name': 'Citizen', 'value': 'On', 'operation': 's'},
            	{'name': 'NonCitizenNational', 'value': 'Off', 'operation': 's'},
            	{'name': 'LawfulPermanentResident', 'value': 'Off', 'operation': 's'},
            	{'name': 'LPRUSCISNumber', 'value': 'N/A', 'operation': 's'},
            	{'name': 'AlienAuthorizedToWork', 'value': 'Off', 'operation': 's'},
            	{'name': 'AlienWorkAuthorizationDate', 'value': 'N/A', 'operation': 's'},
            	{'name': 'AlienUSCISNumber', 'value': 'N/A', 'operation': 's'},
            	{'name': 'AdmissionNumber', 'value': 'N/A', 'operation': 's'},
            	{'name': 'ForeignPassportNumber', 'value': 'N/A', 'operation': 's'},
            	{'name': 'CountryOfIssuance', 'value': 'N/A', 'operation': 's'},
            	{'name': 'sgnEmployeeDate', 'value': '02/26/2019', 'operation': 's'},
            	{'name': 'PreparerOrTranslatorNo', 'value': 'On', 'operation': 's'},
            	{'name': 'PreparerOrTranslatorYes', 'value': 'Off', 'operation': 's'}]}")] string val)
        {
            var result = controller.Post(JsonConvert.DeserializeObject<UpdateFormController.Fields>(val)) as OkObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);

            var resultValue = result.Value as byte[];
            Assert.IsNotNull(resultValue);
            Assert.IsTrue(resultValue.Length > 0);

            System.IO.File.WriteAllBytes("test_output.pdf", resultValue);
        }
    }
}