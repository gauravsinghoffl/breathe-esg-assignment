from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class RawUpload(models.Model):
    SOURCE_CHOICES = [
        ('sap', 'SAP'),
        ('utility', 'Utility'),
        ('travel', 'Travel'),
    ]

    source_type = models.CharField(max_length=20, choices=SOURCE_CHOICES)
    uploaded_file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)


class NormalizedActivity(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    source_type = models.CharField(max_length=20)
    category = models.CharField(max_length=50)
    quantity = models.FloatField()
    unit = models.CharField(max_length=20)
    activity_date = models.DateField()

    suspicious = models.BooleanField(default=False)

    original_data = models.JSONField(default=dict)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)


class AuditLog(models.Model):
    activity = models.ForeignKey(
        NormalizedActivity,
        on_delete=models.CASCADE
    )

    action = models.CharField(max_length=100)

    old_value = models.TextField(blank=True)
    new_value = models.TextField(blank=True)

    changed_at = models.DateTimeField(auto_now_add=True)