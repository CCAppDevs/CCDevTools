﻿using System.ComponentModel.DataAnnotations;

namespace CCDevTools.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int Status { get; set; }
        [Required]
        public DateTime Created { get; set; }
        public DateTime? Modified { get; set; }

        // nav properties
        public int ProjectId { get; set; } // this models an id
        //public virtual Project Project { get; set; }
    }
}
