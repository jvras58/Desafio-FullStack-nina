import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../complaints/access/complaint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-complaint-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complaint-detail.component.html',
  styles: ``
})
export class ComplaintDetailComponent implements OnInit {
  complaint: any;

  constructor(
    private route: ActivatedRoute,
    private complaintService: ComplaintService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadComplaintDetails();
  }
  goBack() {
    this.router.navigate(['/']);
  }

  loadComplaintDetails(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.complaintService.getComplaintById(id).subscribe(data => {
      this.complaint = data;
      this.complaint.User.ageAtComplaint = this.calculateAgeAtComplaint(this.complaint.User.birthdate, this.complaint.date);
    });
  }

  calculateAgeAtComplaint(birthdate: string, complaintDate: string): number {
    const birthDate = new Date(birthdate);
    const complaintDateObj = new Date(complaintDate);
    let age = complaintDateObj.getFullYear() - birthDate.getFullYear();
    const monthDifference = complaintDateObj.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && complaintDateObj.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
