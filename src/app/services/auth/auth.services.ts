import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { LoginDto } from '../../../app/models/user/LoginDto';
import { environment } from '../../../environments/environment';
import { NavigationService } from '../navigation.service';
import { BehaviorSubject, catchError, filter, finalize, interval, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { ResetPasswordDto } from '../../models/user/reset-password-dto';
import { VerifyResetPasswordDto } from '../../models/user/verify-reset-password-dto';
import { UpdatePasswordDto } from '../../models/user/UpdatePasswordDto';
import { UserAccountModel } from '../../models/account/user-account.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  isAuthenticated: boolean = false;
  private stopRefreshing$ = new BehaviorSubject<boolean>(false);
  private refreshSubscription: Subscription | null = null;
  private refreshing$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private navigationService: NavigationService
  ) {}

  get tokenPayLoad(): any {
    return jwtDecode(this.getAccessToken() ?? '');
  }

  auth(loginDto: LoginDto): Observable<any> {
    return this.http
      .post(environment.apiUrl + `/api/account/login`, loginDto)
      .pipe(
        tap((response: any) => {
          if (response.token && response.refreshToken) {
            this.setTokens(response.token, response.refreshToken);
          }
        })
      );
  }

  // Refresh the token using the refresh token stored in cookies
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http
      .post(environment.apiUrl + '/api/account/refresh-token', { refreshToken })
      .pipe(
        tap((response: any) => {
          if (response.token) {
            this.setTokens(response.token, response.refreshToken);
          }
        })
      );
  }

  setTokens(accessToken: string, refreshToken: string): void {
    this.clearTokens();
    const accessTokenExpiresIn = this.getTokenExpiration(accessToken);
    localStorage.setItem('AccessToken', accessToken);
    const encodedToken = this.safeEncode(refreshToken);
    localStorage.setItem('RefreshToken', encodedToken);
  }

  updateProfile(model: UserAccountModel): Observable<void> {
    return this.http.post<void>(
      environment.apiUrl + `/api/account/update-profile`,
      model
    );
  }

  switch(id: string) {
    return this.http.post(environment.apiUrl + `/api/account/switch`, { id });
  }

  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }

  getProfile(): Observable<UserAccountModel> {
    return this.http.get<UserAccountModel>(
      environment.apiUrl + `/api/account/profile`
    );
  }

  changeAuthStatus(isAuthenticated: boolean): void {
    this.isAuthenticated = isAuthenticated;
  }

  // Check if the token is still valid
  checkIfTokenValid(): boolean {
    const token = this.getAccessToken();
    if (token) {
      if (Date.now() < this.tokenPayLoad.exp * 1000) {
        return true;
      }
    }
    return false;
  }

  invalidateToken() {
    this.clearTokens();
  }

  getUserDepartments(): string[] {
    const department = this.tokenPayLoad['Department'];
    if (department == undefined || department == null) return [];

    return Array.isArray(department) ? department : [department];
  }

  getUserDepartmentsTypes(): string[] {
    const department = this.tokenPayLoad['DepartmentTypes'];
    if (department == undefined || department == null) return [];

    return Array.isArray(department) ? department : [department];
  }

  getUserCommitteeRoles(): string[] {
    const committeeRoles = this.tokenPayLoad['CommitteeRoles'];
    if (committeeRoles == undefined || committeeRoles == null) return [];

    return Array.isArray(committeeRoles) ? committeeRoles : [committeeRoles];
  }

  managerForCommitteeId() : string | null{
    return this.tokenPayLoad['ManagerForCommitteeId'] ?? null;
  }

  getUserRoles(): string[] {
    const roles =
      this.tokenPayLoad[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    if (roles == undefined || roles == null) return [];

    return Array.isArray(roles) ? roles : [roles];
  }

  isDelegation(): boolean {
    const isDelegation = this.tokenPayLoad['IsDelegation'];
    if (!!isDelegation) {
      return isDelegation == 'true';
    }

    return false;
  }

  loggedUserId(): string {
    return this.tokenPayLoad['UserId'];
  }

  getUser() {
    return this.tokenPayLoad;
  }

  getCommitteesMemmber() {
    return this.tokenPayLoad[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/committeesmember'
    ];
  }

  getDelegations(): {
    Id: string;
    FirstName: string;
    SecondName: string;
    ThirdName: string;
    LastName: string;
    FullName: string;
  }[] {
    const delegationsStr = this.tokenPayLoad['Delegations'];

    if (delegationsStr && delegationsStr.trim() !== '') {
      try {
        const delegations = JSON.parse(delegationsStr);
        if (Array.isArray(delegations)) return delegations;
      } catch {
        return [];
      }
    }

    return [];
  }

  validateAnyRole(toCheck: string[]) {
    const roles = this.getUserRoles();
    if (Array.isArray(roles))
      return roles.some((i) => toCheck.includes(i.toString()));
    else {
      return toCheck.includes(roles);
    }
  }

  validateAnyCommitteeRole(toCheck: number[]) {
    const roles = this.getUserCommitteeRoles();
    if (Array.isArray(roles))
      return roles.some((i) => toCheck.includes(Number(i)));
    else {
      return toCheck.includes(roles);
    }
  }

  // Logout and clear cookies
  logout(): void {
    this.http.post(environment.apiUrl + `/api/account/logout`, {}).subscribe({
      next: () => {
        this.clearTokens(); // Clear tokens from cookies
        this.navigationService.navigate(['/auth']); // Navigate to login
      },
      error: (err) => {
        this.clearTokens();
        this.navigationService.navigate(['/auth']);
      },
    });
  }

  sendResetPasswordOtp(
    resetPasswordDto: ResetPasswordDto
  ): Observable<boolean> {
    return this.http.post<boolean>(
      `${environment.apiUrl}/api/account/reset-password-otp`,

      resetPasswordDto
    );
  }

  verifyResetPasswordOtp(
    verification: VerifyResetPasswordDto
  ): Observable<boolean> {
    return this.http.post<boolean>(
      `${environment.apiUrl}/api/account/verify-password-otp`,
      verification
    );
  }

  resetPassword(updateUserPassword: UpdatePasswordDto) {
    return this.http.post(
      environment.apiUrl + `/api/account/update-password`,
      updateUserPassword
    );
  }

  getCommitteeId() {
    return this.tokenPayLoad['CommitteeId'];
  }

  // Decode token to get the expiration time
  private getTokenExpiration(token: string): Date {
    const decodedToken: any = jwtDecode(token);

    if (decodedToken.exp) {
      const expirationDate = new Date(decodedToken.exp * 1000); // Convert seconds to milliseconds
      return expirationDate;
    }

    return new Date(); // Return the current date as a fallback
  }

  private safeEncode(value: string): string {
    return encodeURIComponent(value).replace(/\+/g, '%2B');
  }

  private safeDecode(value: string): string {
    return decodeURIComponent(value.replace(/\s/g, '+'));
  }

  clearTokens(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.stopRefreshing$.next(true); // Stop token refresh interval
  }

  getAccessToken(): string | null {
    return localStorage.getItem('AccessToken');
  }

  getRefreshToken(): string | null {
    const encodedToken = localStorage.getItem('RefreshToken');
    return encodedToken ? this.safeDecode(encodedToken) : null;
  }

  // Check if the token is about to expire (e.g., within 5 minutes)
  isTokenExpiringSoon(): boolean {
    const token = this.getAccessToken();
    if (!token) return false; // No token means it needs to be refreshed

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return false;

    const decodedToken: any = jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp * 1000); // Convert from seconds to milliseconds
    return expirationDate.getTime() - Date.now() < 2 * 60 * 1000; // Token will expire in less than 2 minutes
  }

  startTokenRefresh(): void {
    this.refreshSubscription = interval(60000)
      .pipe(
        filter(() => !this.refreshing$.value),
        filter(() => this.isTokenExpiringSoon()),
        switchMap(() => this.performTokenRefresh())
      )
      .subscribe({
        error: (err) => {
          this.clearTokens();
          this.navigationService.navigateByUrl('/auth');
        },
      });
  }

  private performTokenRefresh(): Observable<any> {
    this.refreshing$.next(true);
    return this.refreshToken().pipe(
      tap((response) => {
        if (response && response.accessToken) {
          const decodedToken = jwtDecode(response.accessToken);
          this.setTokens(response.accessToken, response.refreshToken);
        }
      }),
      catchError((error) => {
        this.clearTokens();
        this.navigationService.navigateByUrl('/auth');
        return of(null); // Return an observable that completes immediately
      }),
      finalize(() => this.refreshing$.next(false))
    );
  }

  stopTokenRefresh(): void {
    this.stopRefreshing$.next(true);
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
      this.refreshSubscription = null;
    }
  }

  ngOnDestroy() {
    this.stopTokenRefresh();
  }
}
