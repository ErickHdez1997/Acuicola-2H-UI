import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { BatchService } from '../services/batch.service';
import { CommonModule } from '@angular/common';
import { TankMeasurement } from '../Interfaces/tank-measurement';
import { UserService } from '../services/user.service';
import { UserProfileInfoDto } from '../Interfaces/user-profile-info-dto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  userProfileInfo: UserProfileInfoDto | null = null;

  constructor(
    private authService: AuthService, 
    private userService: UserService,
    private batchService: BatchService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log()
    this.userService.fetchUserProfile(this.userService.getUserId()).subscribe((userProfileInfoDto: UserProfileInfoDto) => {
      this.userProfileInfo = userProfileInfoDto;
    });
    this.userService.setUserId(-1);
    
  }

  openManageBatchesComponent() {
    console.log(this.userProfileInfo)
    this.router.navigate(['batches'], {relativeTo: this.route});
  }

  // To do
  openSummaryComponent() {
    this.router.navigate(['summary'], {relativeTo: this.route});
  }

  // To do
  openSettingsComponent() {
    return;
  }

  openUploadComponent() {
    this.router.navigate(['upload'], {relativeTo: this.route});
  }

  logout() {
    this.authService.logout();
  }

  createTestData() {
    this.batchService.createTestData().subscribe((tankMeasurements: TankMeasurement[] | null) => 
      console.log(tankMeasurements)
    )
  }
}
