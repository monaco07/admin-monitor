import { Component, inject } from '@angular/core'
import { Button } from '@openng/optimus-ui/button'
import { Dialog } from '@openng/optimus-ui/dialog'
import { DynamicDialogRef } from '@openng/optimus-ui/dynamicdialog'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { FloatLabelModule, FloatLabel } from '@openng/optimus-ui/floatlabel'
import { InputTextModule } from '@openng/optimus-ui/inputtext'
import { HostService } from '../host.service'
import { HostStateService } from '../hostState.service'
@Component({
  imports: [Button, FloatLabel, FloatLabelModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './create-host.component.html',
})
export class CreateHostComponent {
  private fb = inject(FormBuilder)
  private ref = inject(DynamicDialogRef)
  private hostService = inject(HostService)
  private hostStateService = inject(HostStateService)
  name: string | undefined
  description: string | undefined

  close() {
    this.ref.destroy()
  }

  protected form = this.fb.group({
    hostname: ['', [Validators.required]],
    description: [''],
  })

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    const hostname = this.form.value.hostname as string // Ist string, weil form required
    const description = this.form.value.description || null
    this.hostService.createHost(hostname, description).subscribe(
      {
        next: () => {
          // TODO vllt erfolgsmeldung?
          this.hostStateService.reload()
          this.close()
        },
        error: (err) => {
          // Todo fehlermeldung
          console.error(err)
        }
      }
    )
  }
}
