using NUnit.Framework;
using iTextService;
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
            var result = controller.Post(JsonConvert.DeserializeObject<UpdateFormController.Fields>(val)) as OkObjectResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual(string.Empty, result.Value);
        }

        [Test]
        public void TestForm(
            [Values(
            "{'file': 'US I9.pdf'}",
            "{'file': 'US I9.pdf', 'operation': 'f'}",
            "{'file': 'US I9.pdf', 'operation': 'f', 'entries': " +
                "[{'name': 'FirstName', 'value': 'Test', 'operation': 's'}]}",
            "{'file': 'US I9.pdf', 'operation': 'f', 'entries': " +
                "[{'name': 'Instructions', 'operation': 'd'}]}",
            "{'file': 'US I9.pdf', 'operation': 'f', 'entries': " +
                "[{'name': 'FirstName', 'value': 'Test', 'operation': 's'}, " +
                "{'name': 'LastName', 'value': 'Person', 'operation': 's'}, " +
                "{'name': 'State', 'value': 'FL', 'operation': 's'}, " +
                "{'name': 'Citizen', 'value': 'On', 'operation': 's'}," +
                "{'name': 'NonCitizenNational', 'value': 'Off', 'operation': 's'}," +
                "{'name': 'Instructions', 'operation': 'd'}]}"
            )] string val)
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