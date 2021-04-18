namespace Driver
{   
    public class AppSettings{
        public string Secret { get; set; }
        public string GenericPassword { get; set; }
        public int GenericPasswordLength { get; set; }
        public double SessionActiveHours { get; set; }
        public string From { get; set; }
        public SmtpSetting SmtpSetting { get; set; }
    }

    public class SmtpSetting{
        public string Host { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool UseSSL { get; set; }
        public int Port { get; set; }
     }
}