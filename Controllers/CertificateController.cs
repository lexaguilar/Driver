using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using DevExpress.XtraReports;
using DevExpress.XtraReports.UI;
using Driver.Extensions;
using Driver.Factory;
using Driver.Models;
using Driver.ViewModel;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Driver.Controllers
{
    [AllowAnonymous]
    public class CertificateController : Controller
    {
        private IWebHostEnvironment _hostingEnvironment;
        private DriverContext _db = null;
        public CertificateController(IWebHostEnvironment environment,DriverContext db)
        {
            _hostingEnvironment = environment;
            this._db = db;
        }

        [Route("api/certificate/Certificado-{id}")]
        public IActionResult Get(int id)
        {
            string[] months = {"Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Nomviembre","Diciembre"};
            var register = _db.Registers
            .Include(x => x.Client)
            .Include(x => x.TypeLicence)
            .FirstOrDefault(x => x.Id == id);

            if(register == null)
                return BadRequest("No se encontró la matricula con código 10");

            var fileInfo = _hostingEnvironment.WebRootFileProvider.GetFileInfo("Reports/Certificate.pdf");

            MemoryStream stream = new MemoryStream();
            using (var inputStream = fileInfo.CreateReadStream())
            {
                PdfReader pdfReader = new PdfReader(inputStream);
                PdfStamper pdfStamper = new PdfStamper(pdfReader, stream, '\0', true);
                {
                    AcroFields fields = pdfStamper.AcroFields;

                    fields.SetField("Name", register.Client.Name);
                    fields.SetField("Identification", register.Client.Identification);
                    fields.SetField("Nivel", "Principiante");
                    fields.SetField("TypeLicence", register.TypeLicence.Name);
                    fields.SetField("Category", register.Categories);
                    fields.SetField("StartDate", register.StartDate.ToString("dd-MM-yy"));
                    fields.SetField("EndDate", register.EndDate?.ToString("dd-MM-yy"));

                    fields.SetField("NoteTheoretical",  register.NoteTheoretical?.ToString());
                    fields.SetField("NotePractice", register.NotePractice?.ToString());

                    fields.SetField("Acta",  register.Acta);
                    fields.SetField("Folio", register.Folio);
                    fields.SetField("Book", register.Book);
                    fields.SetField("ActaYear", register.ActaYear?.ToString());
                    
                    fields.SetField("City", "Managua");
                    fields.SetField("Day", DateTime.Today.ToString("dd"));
                    fields.SetField("Month", months[DateTime.Today.Month - 1]);
                    fields.SetField("Year", DateTime.Today.ToString("yyyy"));



                    foreach (DictionaryEntry item in pdfReader.AcroFields.Fields)
                        fields.SetFieldProperty(item.Key.ToString(),"setfflags",PdfFormField.FF_READ_ONLY, null);

                    pdfStamper.Writer.CloseStream = false;
                    pdfReader.Close();
                    pdfStamper.Close();

                }
            }

            stream.Position = 0;
            
            var result = new FileStreamResult(stream,"application/pdf");
            return result;

        }

        [Route("api/certificate/clase-{id}")]
        public IActionResult GetClase(int id)
        {
            var clasesclient = _db.ClientClasses
            .Include(x => x.Instructor)
            .Include(x => x.Client)
            .Include(x => x.Clase)
            .Where(x => x.ClientId == id).ToList();


            var nombre = "";
            var cedula = "";
            var celular = "";
            if ( clasesclient != null && clasesclient.Count > 0)
            {
                var client = clasesclient[0];
                nombre = client.Client.Name;
                cedula = client.Client.Identification;
                celular = client.Client.PhoneNumber;
            }

            var report = new Repo.ClaseAlumno();
            report.Parameters["nombre"].Value = nombre;
            report.Parameters["cedula"].Value = cedula;
            report.Parameters["celular"].Value = celular;

            foreach (var item in clasesclient)
            {
                SetReportValue(report, $"FECHA{item.ClaseId}", item.ClassDateTime.ToString("dd-MM-yyyy"));
                SetReportValue(report, $"I{item.ClaseId}", item.CreateBy);
                SetReportValue(report, $"title{item.ClaseId}", item.Clase.Name);
                SetReportValue(report, $"o{item.ClaseId}", item.Observation);
                
                if(!string.IsNullOrEmpty(item.SignatureClient))
                    SetReportValue(report, $"xrPictureBox{item.ClaseId}", item.SignatureClient);
            }

            var questions = _db.ClientClassQuestions.Include(x => x.ClientClass).Include(x => x.ClaseQuestion).ThenInclude(x => x.Clase)
            .Where(x => x.ClientClass.ClientId == id).ToList();

            foreach (var item in questions)
            {
                SetReportValue(report, $"subclase{item.ClaseQuestion.ClassOrder}", item.ClaseQuestion.Name);
                SetReportValue(report, $"e{item.ClaseQuestion.ClassOrder}", item.Evaluation.ToString());
            }

            var total = questions.Where(x => x.ClaseQuestion.Clase.Id == 15).Sum(x => x.Evaluation);
            SetReportValue(report, $"total", total.ToString());

            MemoryStream stream = new MemoryStream();
            report.CreateDocument();
            report.PrintingSystem.ExportToPdf(stream);
            stream.Position = 0;

            var result = new FileStreamResult(stream,"application/pdf");
            return result;


            // var result = new FileStreamResult(stream,"application/pdf");
            // return result;

        }

        public Image ByteArrayToImage(byte[] byteArrayIn) {  
            MemoryStream ms = new MemoryStream(byteArrayIn);  
            Image returnImage = Image.FromStream(ms);  
            return returnImage;  
        }  

        private void SetReportValue(XtraReport report, string name, string value)
        {
            var control = report.FindControl(name, true);
            if (control != null)
            {
                if(control is XRPictureBox)
                {
                    var picture = control as XRPictureBox;
                    var firma = value.Replace("data:image/png;base64,", "");
                    var base64Arr = Convert.FromBase64String(firma);
                    Image img = ByteArrayToImage(base64Arr);  
                    picture.Image = img;
                }
                else{
                    control.Text = value;
                }
            }
        }

    }


}
