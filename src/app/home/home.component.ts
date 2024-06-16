import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { CreateTankComponent } from '../create-tank/create-tank.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) {}

  openCreateTankDialog() {
    const dialogRef = this.dialog.open(CreateTankComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Tank created with name: ${result}`);
      }
    });
  }

  navigateToUpload() {
    this.router.navigate(['/upload']);
  }

  logout() {
    this.authService.logout();
  }
}
