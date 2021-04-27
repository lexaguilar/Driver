using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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

                    fields.SetField("NoteTheoretical",  register.NotePractice?.ToString());
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



    }
}
