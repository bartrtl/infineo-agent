"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye, FileText, CheckCircle2, Clock, Send, Wallet, Mail, FileIcon, FileTextIcon, X, AlertTriangle, Upload, Database } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Policy = {
  id: string
  name: string
  uploadDate: string
  policyNumber: string
  policyContactName: string
  insuranceCompany: {
    name: string
    address: string
  }
  premium: number
  deathBenefit: number
  status: {
    uploaded: boolean
    emailVerified: boolean
    docusignSent: boolean
    docusignAccepted: boolean
    dashboardCreated: boolean
    digitization: boolean
    minting: boolean
  }
  blockchainInfo?: {
    address: string
    transactionHash: string
  }
  notes: string
}

const policies: Policy[] = [
  {
    id: "1",
    name: "Life Policy 1",
    uploadDate: "2023-05-15",
    policyNumber: "LP-001-2023",
    policyContactName: "John Doe",
    insuranceCompany: {
      name: "Global Life Insurance Co.",
      address: "123 Insurance St, New York, NY 10001"
    },
    premium: 1500,
    deathBenefit: 500000,
    status: {
      uploaded: true,
      emailVerified: true,
      docusignSent: true,
      docusignAccepted: true,
      dashboardCreated: true,
      digitization: false,
      minting: false,
    },
    notes: "Pending final digitization review.",
  },
  {
    id: "2",
    name: "Life Policy 2",
    uploadDate: "2023-05-16",
    policyNumber: "LP-002-2023",
    policyContactName: "Jane Smith",
    insuranceCompany: {
      name: "Secure Future Insurance",
      address: "456 Safety Ave, Chicago, IL 60601"
    },
    premium: 2000,
    deathBenefit: 750000,
    status: {
      uploaded: true,
      emailVerified: true,
      docusignSent: true,
      docusignAccepted: false,
      dashboardCreated: false,
      digitization: false,
      minting: false,
    },
    notes: `
Agent1 [UserID: A1234] - 2023-05-16 09:30 AM:
Policy uploaded for Jane Smith. Initiating email verification process.

Agent2 [UserID: B5678] - 2023-05-16 10:15 AM:
Email verification completed successfully. Proceeding with DocuSign.

Agent1 [UserID: A1234] - 2023-05-16 11:45 AM:
DocuSign request sent to the client. Awaiting signature.

Agent2 [UserID: B5678] - 2023-05-17 02:30 PM:
Reminder sent to client about pending DocuSign. No response yet.

Agent1 [UserID: A1234] - 2023-05-18 09:00 AM:
Client called to report issues with DocuSign access. Troubleshooting initiated.

Agent2 [UserID: B5678] - 2023-05-18 03:45 PM:
DocuSign access issues resolved. New link sent to client.

Agent1 [UserID: A1234] - 2023-05-19 10:30 AM:
Still waiting for customer to sign documents. Will follow up by EOD.
    `,
  },
  {
    id: "3",
    name: "Life Policy 3",
    uploadDate: "2023-05-17",
    policyNumber: "LP-003-2023",
    policyContactName: "Robert Johnson",
    insuranceCompany: {
      name: "Family First Life",
      address: "789 Protection Rd, Los Angeles, CA 90001"
    },
    premium: 1800,
    deathBenefit: 600000,
    status: {
      uploaded: true,
      emailVerified: false,
      docusignSent: false,
      docusignAccepted: false,
      dashboardCreated: false,
      digitization: false,
      minting: false,
    },
    notes: "Email verification pending.",
  },
  {
    id: "4",
    name: "Life Policy 4",
    uploadDate: "2023-05-18",
    policyNumber: "LP-004-2023",
    policyContactName: "Emily Davis",
    insuranceCompany: {
      name: "Lifetime Security Inc.",
      address: "101 Assurance Blvd, Houston, TX 77001"
    },
    premium: 2500,
    deathBenefit: 1000000,
    status: {
      uploaded: true,
      emailVerified: true,
      docusignSent: true,
      docusignAccepted: true,
      dashboardCreated: true,
      digitization: true,
      minting: true,
    },
    blockchainInfo: {
      address: "0x1234567890123456789012345678901234567890",
      transactionHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    },
    notes: "All processes completed.",
  },
  {
    id: "5",
    name: "Life Policy 5",
    uploadDate: "2023-05-19",
    policyNumber: "LP-005-2023",
    policyContactName: "Michael Brown",
    insuranceCompany: {
      name: "Guardian Life Co.",
      address: "202 Safeguard St, Miami, FL 33101"
    },
    premium: 1200,
    deathBenefit: 400000,
    status: {
      uploaded: true,
      emailVerified: true,
      docusignSent: false,
      docusignAccepted: false,
      dashboardCreated: false,
      digitization: false,
      minting: false,
    },
    notes: "Awaiting DocuSign initiation.",
  },
]

export function PolicyTrackerComponent() {
  console.log("PolicyTrackerComponent rendering");

  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null)
  const [showDocuSignForm, setShowDocuSignForm] = useState(false)
  const [docuSignName, setDocuSignName] = useState("")
  const [docuSignEmail, setDocuSignEmail] = useState("")
  const [docuSignStatus, setDocuSignStatus] = useState("new")
  const [showWalletForm, setShowWalletForm] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [walletEmail, setWalletEmail] = useState("")
  const [signUpEmail, setSignUpEmail] = useState("")
  const [showEmailDetails, setShowEmailDetails] = useState(false)
  const [emailDetails, setEmailDetails] = useState({
    from: "system@example.com",
    to: "user@example.com",
    time: "2023-05-21 10:30 AM",
    content: "This is a randomly generated email content for demonstration purposes."
  })
  const [showIllustrationUpload, setShowIllustrationUpload] = useState(false)
  const [illustrationData, setIllustrationData] = useState("")
  const [showAccountForm, setShowAccountForm] = useState(false)
  const [accountEmail, setAccountEmail] = useState("")
  const [showMintForm, setShowMintForm] = useState(false)

  const StatusIcon = ({ status }: { status: boolean | null }) => {
    if (status === true) return <CheckCircle2 className="h-5 w-5 text-green-400" />;
    if (status === false) return <Clock className="h-5 w-5 text-yellow-400" />;
    return <AlertTriangle className="h-5 w-5 text-orange-400" />;
  }

  const handleInitiateDocuSign = (policy: Policy) => {
    setSelectedPolicy(policy)
    setShowDocuSignForm(true)
    setDocuSignStatus("new")
  }

  const handleSubmitDocuSign = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Initiating DocuSign for:", docuSignName, docuSignEmail)
    setDocuSignStatus("initiated")
    setTimeout(() => {
      setDocuSignStatus("sent for signature")
      setShowDocuSignForm(false)
    }, 2000)
  }

  const handleCreateWallet = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating wallet for:", walletEmail)
    // Add your wallet creation logic here
    setShowWalletForm(false)
  }

  const handleSendSignUpEmail = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sending sign-up email to:", signUpEmail)
    // Add your email sending logic here
    setShowEmailForm(false)
  }

  const openRandomPDF = () => {
    const pdfUrls = [
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf",
      "https://www.africau.edu/images/default/sample.pdf"
    ];
    const randomPdfUrl = pdfUrls[Math.floor(Math.random() * pdfUrls.length)];
    window.open(randomPdfUrl, '_blank');
  };

  const handleViewEmailDetails = () => {
    // In a real application, you would fetch the actual email details here
    setEmailDetails({
      from: "system@example.com",
      to: "user@example.com",
      time: new Date().toLocaleString(),
      content: `This is a randomly generated email content for demonstration purposes. Random number: ${Math.random()}`
    })
    setShowEmailDetails(true)
  }

  const handleUploadIllustrations = (policy: Policy) => {
    setSelectedPolicy(policy)
    setShowIllustrationUpload(true)
  }

  const handleSaveIllustrations = () => {
    try {
      JSON.parse(illustrationData)
      console.log("Saving illustrations for policy:", selectedPolicy?.id)
      console.log("Illustration data:", illustrationData)
      // Here you would typically send this data to your backend
      setShowIllustrationUpload(false)
      setIllustrationData("")
    } catch (error) {
      alert("Invalid JSON data. Please check your input.")
    }
  }

  const handleCreateAccount = (policy: Policy) => {
    setSelectedPolicy(policy)
    setAccountEmail(`${policy.policyContactName.toLowerCase().replace(' ', '.')}@example.com`)
    setShowAccountForm(true)
  }

  const handleMint = (policy: Policy) => {
    setSelectedPolicy(policy)
    setShowMintForm(true)
  }

  const handleSendAccountEmail = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending account creation email to:", accountEmail);
    // Add your email sending logic here
    setShowAccountForm(false);
  };

  useEffect(() => {
    console.log("Selected policy updated:", selectedPolicy);
  }, [selectedPolicy]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">Policy Tracker</h1>
        <div className="rounded-md border border-gray-700 overflow-hidden">
            <Table>
              <TableHeader>
              <TableRow className="bg-gray-800 hover:bg-gray-800">
                  <TableHead className="font-semibold text-gray-300">Policy Name</TableHead>
                  <TableHead className="font-semibold text-gray-300">Upload Date</TableHead>
                  <TableHead className="text-center font-semibold text-gray-300">Uploaded</TableHead>
                  <TableHead className="text-center font-semibold text-gray-300">Email Verified</TableHead>
                  <TableHead className="text-center font-semibold text-gray-300">Account Creation</TableHead>
                  <TableHead className="text-center font-semibold text-gray-300">Dashboard</TableHead>
                  <TableHead className="text-center font-semibold text-gray-300">Minting</TableHead>
                  <TableHead className="font-semibold text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((policy) => (
                  <TableRow key={policy.id} className="border-b border-gray-700 hover:bg-gray-800">
                    <TableCell className="font-medium">{policy.name}</TableCell>
                    <TableCell>{policy.uploadDate}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <StatusIcon status={policy.status.uploaded} />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <StatusIcon status={policy.status.emailVerified} />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center">
                        <StatusIcon status={policy.status.docusignSent && policy.status.docusignAccepted} />
                        {!policy.status.docusignSent && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCreateAccount(policy)}
                            className="ml-2 bg-yellow-600 text-gray-100 hover:bg-yellow-500"
                          >
                            <Wallet className="h-4 w-4 mr-2" />
                            Create Account
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center">
                        <StatusIcon status={policy.status.dashboardCreated} />
                        {!policy.status.dashboardCreated && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUploadIllustrations(policy)}
                            className="ml-2 bg-blue-600 text-gray-100 hover:bg-blue-500"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Illustrations
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center">
                        {policy.status.minting ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" className="p-0">
                                <Database className="h-5 w-5 text-green-400 cursor-pointer" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-800 text-gray-100 border border-gray-700">
                              <DialogHeader>
                                <DialogTitle className="text-lg font-semibold text-gray-100">Blockchain Information</DialogTitle>
                              </DialogHeader>
                              <div className="mt-4 space-y-4">
                                <div>
                                  <h4 className="font-semibold text-gray-300">Address:</h4>
                                  <p className="text-gray-400 break-all">{policy.blockchainInfo?.address}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-300">Transaction Hash:</h4>
                                  <p className="text-gray-400 break-all">{policy.blockchainInfo?.transactionHash}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <>
                            <Clock className="h-5 w-5 text-yellow-400" />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMint(policy)}
                              className="ml-2 bg-green-600 text-gray-100 hover:bg-green-500"
                            >
                              <Database className="h-4 w-4 mr-2" />
                              Mint
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPolicy(policy)}
                              className="bg-gray-700 text-gray-100 hover:bg-gray-600 hover:text-white"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-800 text-gray-100 border border-gray-700">
                            <DialogHeader>
                              <DialogTitle className="text-lg font-semibold text-gray-100">{selectedPolicy?.name}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4 max-h-[70vh] overflow-y-auto pr-4">
                              <div className="space-y-4">
                                <div>
                                  <p className="text-gray-400"><strong>Email:</strong> {selectedPolicy?.policyContactName.toLowerCase().replace(' ', '.')}@example.com</p>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2 text-gray-300">Policy Details:</h3>
                                  <p className="text-gray-400">Policy Number: {selectedPolicy?.policyNumber}</p>
                                  <p className="text-gray-400">Upload Date: {selectedPolicy?.uploadDate}</p>
                                  <p className="text-gray-400">Policy Contact: {selectedPolicy?.policyContactName}</p>
                                  <p className="text-gray-400">Premium: ${selectedPolicy?.premium}</p>
                                  <p className="text-gray-400">Death Benefit: ${selectedPolicy?.deathBenefit}</p>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2 text-gray-300">Insurance Company:</h3>
                                  <p className="text-gray-400">{selectedPolicy?.insuranceCompany.name}</p>
                                  <p className="text-gray-400">{selectedPolicy?.insuranceCompany.address}</p>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2 text-gray-300">Status:</h3>
                                  <ul className="space-y-2">
                                    <li className="flex items-center space-x-2">
                                      <div className="w-5 flex justify-center">
                                        <StatusIcon status={selectedPolicy?.status.uploaded || false} />
                                      </div>
                                      <span className="text-gray-400">Uploaded</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                      <div className="w-5 flex justify-center">
                                        <StatusIcon status={selectedPolicy?.status.emailVerified || false} />
                                      </div>
                                      <span className="text-gray-400">Email Verified</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                      <div className="w-5 flex justify-center">
                                        <StatusIcon status={(selectedPolicy?.status.docusignSent && selectedPolicy?.status.docusignAccepted) || false} />
                                      </div>
                                      <span className="text-gray-400">Account Created</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                      <div className="w-5 flex justify-center">
                                        <StatusIcon status={selectedPolicy?.status.dashboardCreated || false} />
                                      </div>
                                      <span className="text-gray-400">Dashboard Created</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                      <div className="w-5 flex justify-center">
                                        {selectedPolicy?.status.minting ? (
                                          <Database className="h-5 w-5 text-green-400" />
                                        ) : (
                                          <Clock className="h-5 w-5 text-yellow-400" />
                                        )}
                                      </div>
                                      <span className="text-gray-400">Minting</span>
                                      {selectedPolicy?.status.minting && (
                                        <span className="text-gray-400 ml-2 break-all">
                                          (Address: {selectedPolicy.blockchainInfo?.address}, 
                                          Transaction: {selectedPolicy.blockchainInfo?.transactionHash})
                                        </span>
                                      )}
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2 text-gray-300">Notes:</h3>
                                  <p className="text-gray-400">{selectedPolicy?.notes}</p>
                                </div>
                                {selectedPolicy?.id === "4" && (
                                  <div>
                                    <h3 className="font-semibold mb-2 text-gray-300">Process Details:</h3>
                                    <ul className="space-y-2">
                                      <li className="flex items-center space-x-2">
                                        <FileIcon className="h-5 w-5 text-blue-400" />
                                        <span className="text-gray-400">DocuSign received on 2023-05-20</span>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="p-0 hover:bg-transparent"
                                          onClick={openRandomPDF}
                                        >
                                          <FileTextIcon className="h-5 w-5 text-red-400 hover:text-red-300" />
                                        </Button>
                                      </li>
                                      <li className="flex items-center space-x-2">
                                        <Wallet className="h-5 w-5 text-purple-400" />
                                        <span className="text-gray-400">Wallet created: 0x1234...5678</span>
                                      </li>
                                      <li className="flex items-center space-x-2">
                                        <Mail className="h-5 w-5 text-green-400" />
                                        <span className="text-gray-400">Email sent on 2023-05-21 10:30 AM</span>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="ml-2 bg-green-600 text-gray-100 hover:bg-green-500"
                                          onClick={handleViewEmailDetails}
                                        >
                                          View Details
                                        </Button>
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Dialog key={selectedPolicy?.id}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="bg-gray-700 text-gray-100 hover:bg-gray-600 hover:text-white"
                              onClick={() => {
                                console.log("Notes button clicked for policy:", policy);
                                setSelectedPolicy(policy);
                              }}
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Notes
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-800 text-gray-100 border border-gray-700">
                            <DialogHeader>
                              <DialogTitle className="text-lg font-semibold text-gray-100">Notes for {selectedPolicy?.name}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4 max-h-96 overflow-y-auto">
                              <pre className="text-gray-400 whitespace-pre-wrap">
                                {selectedPolicy?.notes || "No notes available."}
                              </pre>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
      </div>

      {/* Account Creation Form Dialog */}
      <Dialog open={showAccountForm} onOpenChange={setShowAccountForm}>
        <DialogContent className="bg-gray-800 text-gray-100 border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-100">Create Account for {selectedPolicy?.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSendAccountEmail} className="space-y-4">
            <div>
              <Label htmlFor="accountEmail" className="text-gray-300">Email</Label>
              <Input
                id="accountEmail"
                type="email"
                value={accountEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountEmail(e.target.value)}
                className="bg-gray-700 text-gray-100 border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="emailContent" className="text-gray-300">Email Content</Label>
              <Textarea
                id="emailContent"
                value={`Dear ${selectedPolicy?.policyContactName},

We are excited to inform you about the benefits of creating an infineo account. By creating an account, you will be able to digitize your whole life insurance policy, participate in the $SOUND token, and enjoy other benefits.

Please find your contact information below:
- Policy Number: ${selectedPolicy?.policyNumber}
- Broker: ${selectedPolicy?.insuranceCompany.name}
- Policy Holder: ${selectedPolicy?.policyContactName}
- Email: ${accountEmail}

Best regards,
infineo Team`}
                readOnly
                className="bg-gray-700 text-gray-100 border-gray-600 h-64"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
                Send Email
              </Button>
            </div>
          </form>
          <div className="mt-4">
            <Button 
              onClick={() => {
                console.log("Creating account for:", accountEmail);
                // Add your account creation logic here
                setShowAccountForm(false);
              }} 
              className="w-full bg-yellow-600 hover:bg-yellow-500"
            >
              Create Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Details Dialog */}
      <Dialog open={showEmailDetails} onOpenChange={setShowEmailDetails}>
        <DialogContent className="bg-gray-800 text-gray-100 border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-100">Email Details</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-gray-400"><strong>From:</strong> {emailDetails.from}</p>
              <p className="text-gray-400"><strong>To:</strong> {emailDetails.to}</p>
              <p className="text-gray-400"><strong>Time:</strong> {emailDetails.time}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-300">Content:</h4>
              <p className="text-gray-400">{emailDetails.content}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Illustration Upload Dialog */}
      <Dialog open={showIllustrationUpload} onOpenChange={setShowIllustrationUpload}>
        <DialogContent className="bg-gray-800 text-gray-100 border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-100">Upload Illustrations for {selectedPolicy?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <Label htmlFor="illustrationData" className="text-gray-300">Illustration data</Label>
            <Textarea
              id="illustrationData"
              value={illustrationData}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setIllustrationData(e.target.value)}
              className="bg-gray-700 text-gray-100 border-gray-600 h-64"
              placeholder="Paste your Illustration data here..."
            />
            <div className="flex justify-end">
              <Button onClick={handleSaveIllustrations} className="bg-blue-600 hover:bg-blue-500">
                Save Illustrations
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mint Form Dialog */}
      <Dialog open={showMintForm} onOpenChange={setShowMintForm}>
        <DialogContent className="bg-gray-800 text-gray-100 border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-100">Mint Policy {selectedPolicy?.policyNumber}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400"><strong>Blockchain Account:</strong> {selectedPolicy?.blockchainInfo?.address || "Not available"}</p>
            </div>
            <div>
              <p className="text-gray-400"><strong>Policy Number:</strong> {selectedPolicy?.policyNumber}</p>
            </div>
            <div>
              <p className="text-gray-400"><strong>Broker:</strong> {selectedPolicy?.insuranceCompany.name}</p>
            </div>
            <div>
              <p className="text-gray-400"><strong>Policy Holder:</strong> {selectedPolicy?.policyContactName}</p>
            </div>
            <div>
              <p className="text-gray-400"><strong>Email:</strong> {selectedPolicy?.policyContactName.toLowerCase().replace(' ', '.')}@example.com</p>
            </div>
            <div className="flex justify-end">
              <Button 
                className="bg-green-600 hover:bg-green-500"
                onClick={() => {
                  console.log("Minting policy:", selectedPolicy?.id);
                  // Add your minting logic here
                  setShowMintForm(false);
                }}
              >
                Mint
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}